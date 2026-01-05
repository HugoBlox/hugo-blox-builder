---
title: "React Performance Optimization: A Practical Guide"
date: 2024-11-22
summary: "Learn how to identify and fix performance bottlenecks in React applications with real-world examples and profiling techniques"
tags:
  - React
  - Performance
  - JavaScript
  - Frontend
  - Optimization
authors:
  - me
featured: true
---

React apps can become slow as they grow. This guide covers practical techniques to identify bottlenecks and optimize performance, backed by real-world examples.

## Common Performance Issues

Before optimizing, measure. Use React DevTools Profiler to identify:
- Unnecessary re-renders
- Heavy computations
- Large component trees
- Inefficient list rendering

## 1. Prevent Unnecessary Re-renders

### Problem: Parent Re-renders Cascade

```jsx
// ❌ Bad: Child re-renders on every parent update
function Parent() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild /> {/* Re-renders even though it doesn't use count! */}
    </div>
  )
}
```

### Solution: React.memo

```jsx
// ✅ Good: Child only re-renders when props change
const ExpensiveChild = React.memo(() => {
  console.log('ExpensiveChild rendered')
  return <div>{/* expensive rendering */}</div>
})
```

**When to use**: Components that render often but rarely change props.

## 2. Optimize Expensive Calculations

### Problem: Recalculating on Every Render

```jsx
// ❌ Bad: filterItems runs on every render
function ProductList({ products, searchTerm }) {
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) // Runs even when products/searchTerm haven't changed!
  
  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}
```

### Solution: useMemo

```jsx
// ✅ Good: Only recalculates when dependencies change
function ProductList({ products, searchTerm }) {
  const filtered = useMemo(() => 
    products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [products, searchTerm]
  )
  
  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}
```

**When to use**: Expensive calculations that don't need to run on every render.

## 3. Stabilize Function References

### Problem: New Function on Every Render

```jsx
// ❌ Bad: handleClick creates new function every render
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = () => setCount(count + 1)
  
  return <Child onClick={handleClick} /> // Child re-renders!
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>
})
```

### Solution: useCallback

```jsx
// ✅ Good: handleClick reference stays stable
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1) // Use functional update!
  }, []) // Empty deps because we use functional update
  
  return <Child onClick={handleClick} />
}
```

**When to use**: Passing callbacks to memoized child components.

## 4. Virtual Lists for Large Datasets

### Problem: Rendering 10,000 Items

```jsx
// ❌ Bad: Renders all 10,000 items (slow!)
function LargeList({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### Solution: react-window

```jsx
// ✅ Good: Only renders visible items
import { FixedSizeList } from 'react-window'

function LargeList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

**Result**: 10,000 items render in <50ms instead of 2000ms!

## 5. Code Splitting & Lazy Loading

### Problem: Large Bundle Size

```jsx
// ❌ Bad: Everything loads upfront
import AdminPanel from './AdminPanel' // 500KB!
import UserDashboard from './UserDashboard'

function App() {
  return isAdmin ? <AdminPanel /> : <UserDashboard />
}
```

### Solution: React.lazy

```jsx
// ✅ Good: Load components on demand
const AdminPanel = React.lazy(() => import('./AdminPanel'))
const UserDashboard = React.lazy(() => import('./UserDashboard'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      {isAdmin ? <AdminPanel /> : <UserDashboard />}
    </Suspense>
  )
}
```

**Result**: Initial bundle: 150KB instead of 650KB!

## 6. Optimize Context Usage

### Problem: Context Causes Mass Re-renders

```jsx
// ❌ Bad: Every consumer re-renders on any state change
const AppContext = createContext()

function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])
  
  return (
    <AppContext.Provider value={{ user, theme, notifications, setUser, setTheme }}>
      {children}
    </AppContext.Provider>
  )
}
```

### Solution: Split Contexts

```jsx
// ✅ Good: Separate contexts for different concerns
const UserContext = createContext()
const ThemeContext = createContext()
const NotificationContext = createContext()

function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NotificationContext.Provider value={{ notifications }}>
          {children}
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}
```

**Result**: Components only re-render when their specific context changes!

## 7. Debounce Expensive Operations

### Problem: Search Triggers on Every Keystroke

```jsx
// ❌ Bad: API call on every keystroke
function SearchBox() {
  const [query, setQuery] = useState('')
  
  useEffect(() => {
    searchAPI(query) // Called 10+ times as user types "javascript"!
  }, [query])
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

### Solution: Custom Debounce Hook

```jsx
// ✅ Good: API call only after user stops typing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

function SearchBox() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  
  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery) // Called once after 300ms pause!
    }
  }, [debouncedQuery])
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

## 8. Key Props Matter

### Problem: Poor Key Choices

```jsx
// ❌ Bad: Using index as key causes issues
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// When items reorder, React thinks they're different components!
```

### Solution: Stable, Unique Keys

```jsx
// ✅ Good: Use stable IDs
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

## Real-World Example: Optimizing a Dashboard

**Before**: Dashboard with 20 widgets, each fetching data, all re-rendering on any state change.

**After optimization**:
1. Split into separate contexts for user, theme, data
2. Memoized individual widgets with React.memo
3. Used useMemo for data transformations
4. Lazy loaded heavy charts
5. Debounced filter inputs

**Result**: 
- Initial render: 3000ms → 800ms
- Interactions: 200ms → 50ms
- Bundle size: 800KB → 250KB (initial) + 550KB (lazy)

## Profiling Workflow

1. **React DevTools Profiler**
   - Record interaction
   - Identify components taking longest
   - Check why they rendered (props change? parent render?)

2. **Chrome DevTools Performance**
   - Record performance
   - Look for long tasks (>50ms)
   - Check FPS during animations

3. **Lighthouse**
   - Run audit
   - Focus on "Time to Interactive"
   - Check bundle sizes

## Common Pitfalls

❌ **Don't** optimize prematurely  
✅ **Do** measure first, optimize bottlenecks

❌ **Don't** memo everything  
✅ **Do** memo expensive components

❌ **Don't** use useMemo for simple calculations  
✅ **Do** use for actual performance issues

❌ **Don't** forget dependency arrays  
✅ **Do** include all dependencies (or use ESLint plugin)

## Performance Checklist

- [ ] Use React DevTools Profiler to identify issues
- [ ] Memoize expensive child components
- [ ] Use useMemo for heavy calculations
- [ ] Use useCallback for callbacks to memoized children
- [ ] Implement code splitting for large components
- [ ] Use virtual lists for large datasets
- [ ] Debounce expensive operations (search, API calls)
- [ ] Use proper key props for lists
- [ ] Split contexts to minimize re-renders
- [ ] Optimize bundle size (tree shaking, minification)

## Tools & Resources

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [react-window](https://react-window.vercel.app/)
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
- [Why Did You Render](https://github.com/welldone-software/why-did-you-render)

## Conclusion

Performance optimization is about:
1. **Measuring** before optimizing
2. **Identifying** actual bottlenecks
3. **Applying** targeted fixes
4. **Verifying** improvements

Don't optimize blindly—profile, fix, measure, repeat!

---

**Want to dive deeper?** Check out my [React Performance Workshop](https://github.com/alexjohnson/react-perf-workshop).

Questions? Reach out on [Twitter](https://twitter.com/alexjohnson)!
