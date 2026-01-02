this.markmap = this.markmap || {};
(function(exports) {
  "use strict";
  var _a;
  const testPath = "npm2url/dist/index.cjs";
  const defaultProviders = {
    jsdelivr: (path) => `https://cdn.jsdelivr.net/npm/${path}`,
    unpkg: (path) => `https://unpkg.com/${path}`
  };
  async function checkUrl(url, signal) {
    const res = await fetch(url, {
      signal
    });
    if (!res.ok) {
      throw res;
    }
    await res.text();
  }
  class UrlBuilder {
    constructor() {
      this.providers = { ...defaultProviders };
      this.provider = "jsdelivr";
    }
    /**
     * Get the fastest provider name.
     * If none of the providers returns a valid response within `timeout`, an error will be thrown.
     */
    async getFastestProvider(timeout = 5e3, path = testPath) {
      const controller = new AbortController();
      let timer = 0;
      try {
        return await new Promise((resolve, reject) => {
          Promise.all(
            Object.entries(this.providers).map(async ([name, factory]) => {
              try {
                await checkUrl(factory(path), controller.signal);
                resolve(name);
              } catch {
              }
            })
          ).then(() => reject(new Error("All providers failed")));
          timer = setTimeout(reject, timeout, new Error("Timed out"));
        });
      } finally {
        controller.abort();
        clearTimeout(timer);
      }
    }
    /**
     * Set the current provider to the fastest provider found by `getFastestProvider`.
     */
    async findFastestProvider(timeout, path) {
      this.provider = await this.getFastestProvider(timeout, path);
      return this.provider;
    }
    setProvider(name, factory) {
      if (factory) {
        this.providers[name] = factory;
      } else {
        delete this.providers[name];
      }
    }
    getFullUrl(path, provider = this.provider) {
      if (path.includes("://")) {
        return path;
      }
      const factory = this.providers[provider];
      if (!factory) {
        throw new Error(`Provider ${provider} not found`);
      }
      return factory(path);
    }
  }
  const urlBuilder = new UrlBuilder();
  Math.random().toString(36).slice(2, 8);
  function defer() {
    const obj = {};
    obj.promise = new Promise((resolve, reject) => {
      obj.resolve = resolve;
      obj.reject = reject;
    });
    return obj;
  }
  function memoize(fn) {
    const cache = {};
    return function memoized(...args) {
      const key = `${args[0]}`;
      let data = cache[key];
      if (!data) {
        data = {
          value: fn(...args)
        };
        cache[key] = data;
      }
      return data.value;
    };
  }
  /*! @gera2ld/jsx-dom v2.2.2 | ISC License */
  const VTYPE_ELEMENT = 1;
  const VTYPE_FUNCTION = 2;
  const SVG_NS = "http://www.w3.org/2000/svg";
  const XLINK_NS = "http://www.w3.org/1999/xlink";
  const NS_ATTRS = {
    show: XLINK_NS,
    actuate: XLINK_NS,
    href: XLINK_NS
  };
  const isLeaf = (c) => typeof c === "string" || typeof c === "number";
  const isElement = (c) => (c == null ? void 0 : c.vtype) === VTYPE_ELEMENT;
  const isRenderFunction = (c) => (c == null ? void 0 : c.vtype) === VTYPE_FUNCTION;
  function h(type, props, ...children) {
    props = Object.assign({}, props, {
      children: children.length === 1 ? children[0] : children
    });
    return jsx(type, props);
  }
  function jsx(type, props) {
    let vtype;
    if (typeof type === "string") vtype = VTYPE_ELEMENT;
    else if (typeof type === "function") vtype = VTYPE_FUNCTION;
    else throw new Error("Invalid VNode type");
    return {
      vtype,
      type,
      props
    };
  }
  function Fragment(props) {
    return props.children;
  }
  const DEFAULT_ENV = {
    isSvg: false
  };
  function insertDom(parent, nodes) {
    if (!Array.isArray(nodes)) nodes = [nodes];
    nodes = nodes.filter(Boolean);
    if (nodes.length) parent.append(...nodes);
  }
  function mountAttributes(domElement, props, env) {
    for (const key in props) {
      if (key === "key" || key === "children" || key === "ref") continue;
      if (key === "dangerouslySetInnerHTML") {
        domElement.innerHTML = props[key].__html;
      } else if (key === "innerHTML" || key === "textContent" || key === "innerText" || key === "value" && ["textarea", "select"].includes(domElement.tagName)) {
        const value = props[key];
        if (value != null) domElement[key] = value;
      } else if (key.startsWith("on")) {
        domElement[key.toLowerCase()] = props[key];
      } else {
        setDOMAttribute(domElement, key, props[key], env.isSvg);
      }
    }
  }
  const attrMap = {
    className: "class",
    labelFor: "for"
  };
  function setDOMAttribute(el, attr, value, isSVG) {
    attr = attrMap[attr] || attr;
    if (value === true) {
      el.setAttribute(attr, "");
    } else if (value === false) {
      el.removeAttribute(attr);
    } else {
      const namespace = isSVG ? NS_ATTRS[attr] : void 0;
      if (namespace !== void 0) {
        el.setAttributeNS(namespace, attr, value);
      } else {
        el.setAttribute(attr, value);
      }
    }
  }
  function flatten(arr) {
    return arr.reduce((prev, item) => prev.concat(item), []);
  }
  function mountChildren(children, env) {
    return Array.isArray(children) ? flatten(children.map((child) => mountChildren(child, env))) : mount(children, env);
  }
  function mount(vnode, env = DEFAULT_ENV) {
    if (vnode == null || typeof vnode === "boolean") {
      return null;
    }
    if (vnode instanceof Node) {
      return vnode;
    }
    if (isRenderFunction(vnode)) {
      const {
        type,
        props
      } = vnode;
      if (type === Fragment) {
        const node = document.createDocumentFragment();
        if (props.children) {
          const children = mountChildren(props.children, env);
          insertDom(node, children);
        }
        return node;
      }
      const childVNode = type(props);
      return mount(childVNode, env);
    }
    if (isLeaf(vnode)) {
      return document.createTextNode(`${vnode}`);
    }
    if (isElement(vnode)) {
      let node;
      const {
        type,
        props
      } = vnode;
      if (!env.isSvg && type === "svg") {
        env = Object.assign({}, env, {
          isSvg: true
        });
      }
      if (!env.isSvg) {
        node = document.createElement(type);
      } else {
        node = document.createElementNS(SVG_NS, type);
      }
      mountAttributes(node, props, env);
      if (props.children) {
        let childEnv = env;
        if (env.isSvg && type === "foreignObject") {
          childEnv = Object.assign({}, childEnv, {
            isSvg: false
          });
        }
        const children = mountChildren(props.children, childEnv);
        if (children != null) insertDom(node, children);
      }
      const {
        ref
      } = props;
      if (typeof ref === "function") ref(node);
      return node;
    }
    throw new Error("mount: Invalid Vnode!");
  }
  function mountDom(vnode) {
    return mount(vnode);
  }
  function hm(...args) {
    return mountDom(h(...args));
  }
  const memoizedPreloadJS = memoize((url) => {
    document.head.append(
      hm("link", {
        rel: "preload",
        as: "script",
        href: url
      })
    );
  });
  const jsCache = {};
  const cssCache = {};
  async function loadJSItem(item, context) {
    var _a2;
    const src = item.type === "script" && ((_a2 = item.data) == null ? void 0 : _a2.src) || "";
    item.loaded || (item.loaded = jsCache[src]);
    if (!item.loaded) {
      const deferred = defer();
      item.loaded = deferred.promise;
      if (item.type === "script") {
        document.head.append(
          hm("script", {
            ...item.data,
            onLoad: () => deferred.resolve(),
            onError: deferred.reject
          })
        );
        if (!src) {
          deferred.resolve();
        } else {
          jsCache[src] = item.loaded;
        }
      }
      if (item.type === "iife") {
        const { fn, getParams } = item.data;
        fn(...(getParams == null ? void 0 : getParams(context)) || []);
        deferred.resolve();
      }
    }
    await item.loaded;
  }
  async function loadCSSItem(item) {
    const url = item.type === "stylesheet" && item.data.href || "";
    item.loaded || (item.loaded = cssCache[url]);
    if (!item.loaded) {
      const deferred = defer();
      item.loaded = deferred.promise;
      if (url) cssCache[url] = item.loaded;
      if (item.type === "style") {
        document.head.append(
          hm("style", {
            textContent: item.data
          })
        );
        deferred.resolve();
      } else if (url) {
        document.head.append(
          hm("link", {
            rel: "stylesheet",
            ...item.data
          })
        );
        fetch(url).then((res) => {
          if (res.ok) return res.text();
          throw res;
        }).then(() => deferred.resolve(), deferred.reject);
      }
    }
    await item.loaded;
  }
  async function loadJS(items, context) {
    items.forEach((item) => {
      var _a2;
      if (item.type === "script" && ((_a2 = item.data) == null ? void 0 : _a2.src)) {
        memoizedPreloadJS(item.data.src);
      }
    });
    context = {
      getMarkmap: () => window.markmap,
      ...context
    };
    for (const item of items) {
      await loadJSItem(item, context);
    }
  }
  async function loadCSS(items) {
    await Promise.all(items.map((item) => loadCSSItem(item)));
  }
  function buildJSItem(path) {
    return {
      type: "script",
      data: {
        src: path
      }
    };
  }
  function buildCSSItem(path) {
    return {
      type: "stylesheet",
      data: {
        href: path
      }
    };
  }
  const enabled = {};
  const autoLoaderOptions = {
    baseJs: [
      `d3@${"7.9.0"}`,
      `markmap-lib@${"0.18.12"}`,
      `markmap-view@${"0.18.12"}`,
      `markmap-toolbar@${"0.18.12"}`
    ],
    baseCss: [`markmap-toolbar@${"0.18.12"}/dist/style.css`],
    manual: false,
    toolbar: false,
    ...(_a = window.markmap) == null ? void 0 : _a.autoLoader
  };
  async function initialize() {
    var _a2;
    if (typeof autoLoaderOptions.provider === "function") {
      urlBuilder.setProvider(
        urlBuilder.provider = "autoLoader",
        autoLoaderOptions.provider
      );
    } else if (typeof autoLoaderOptions.provider === "string") {
      urlBuilder.provider = autoLoaderOptions.provider;
    } else {
      try {
        await urlBuilder.findFastestProvider();
      } catch {
      }
    }
    await Promise.all([
      loadJS(
        autoLoaderOptions.baseJs.map(
          (item) => typeof item === "string" ? buildJSItem(urlBuilder.getFullUrl(item)) : item
        )
      ),
      loadCSS(
        autoLoaderOptions.baseCss.map(
          (item) => typeof item === "string" ? buildCSSItem(urlBuilder.getFullUrl(item)) : item
        )
      )
    ]);
    const { markmap } = window;
    const style = document.createElement("style");
    style.textContent = markmap.globalCSS;
    document.body.prepend(style);
    (_a2 = autoLoaderOptions.onReady) == null ? void 0 : _a2.call(autoLoaderOptions);
  }
  const ready = initialize();
  function transform(transformer, content) {
    const result = transformer.transform(content);
    const keys = Object.keys(result.features).filter((key) => !enabled[key]);
    keys.forEach((key) => {
      enabled[key] = true;
    });
    const { styles, scripts } = transformer.getAssets(keys);
    const { markmap } = window;
    if (styles) markmap.loadCSS(styles);
    if (scripts) markmap.loadJS(scripts);
    return result;
  }
  function render(el) {
    var _a2;
    const { Transformer, Markmap, deriveOptions, Toolbar } = window.markmap;
    const lines = ((_a2 = el.textContent) == null ? void 0 : _a2.split("\n")) || [];
    let indent = Infinity;
    lines.forEach((line) => {
      var _a3;
      const spaces = ((_a3 = line.match(/^\s*/)) == null ? void 0 : _a3[0].length) || 0;
      if (spaces < line.length) indent = Math.min(indent, spaces);
    });
    const content = lines.map((line) => line.slice(indent)).join("\n").trim();
    const transformer = new Transformer(autoLoaderOptions.transformPlugins);
    transformer.urlBuilder = urlBuilder;
    el.innerHTML = "<svg></svg>";
    const svg = el.firstChild;
    const mm = Markmap.create(svg, { embedGlobalCSS: false });
    if (autoLoaderOptions.toolbar) {
      const { el: toolbar } = Toolbar.create(mm);
      Object.assign(toolbar.style, {
        position: "absolute",
        right: "20px",
        bottom: "20px"
      });
      el.append(toolbar);
    }
    const doRender = async () => {
      const { root, frontmatter } = transform(transformer, content);
      const markmapOptions = frontmatter == null ? void 0 : frontmatter.markmap;
      const frontmatterOptions = deriveOptions(markmapOptions);
      await mm.setData(root, frontmatterOptions);
      mm.fit();
    };
    transformer.hooks.retransform.tap(doRender);
    doRender();
  }
  async function renderAllUnder(container) {
    await ready;
    container.querySelectorAll(".markmap").forEach(render);
  }
  function renderAll() {
    return renderAllUnder(document);
  }
  if (!autoLoaderOptions.manual) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", () => {
        renderAll();
      });
    else renderAll();
  }
  exports.ready = ready;
  exports.render = render;
  exports.renderAll = renderAll;
  exports.renderAllUnder = renderAllUnder;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
})(this.markmap.autoLoader = this.markmap.autoLoader || {});
