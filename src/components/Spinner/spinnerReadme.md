## Spinner Component

The Spinner component provides a simple, animated loading indicator that can be customized with various sizes, colors, and stroke widths. Built with SVG for crisp rendering at any size.

## Props

### `size`

- **Type:** `number | string`
- **Default:** `20`
- **Description:** Size of the spinner. Numbers are converted to pixels, strings can be any valid CSS value (e.g., "2rem", "100%")

### `color`

- **Type:** `string`
- **Default:** `"currentColor"`
- **Description:** Color of the spinner. Accepts any valid CSS color value (hex, rgb, hsl, named colors)

### `strokeWidth`

- **Type:** `number`
- **Default:** `4`
- **Description:** Width of the spinner's circular stroke

### `className`

- **Type:** `string`
- **Default:** `""`
- **Description:** Additional CSS classes to apply to the SVG element

## Examples

### Custom Size

```typescript
// Using number (pixels)
<Spinner size={32} />

// Using string (CSS units)
<Spinner size="2rem" />
<Spinner size="48px" />
```

### Custom Color

```typescript
// Hex color
<Spinner color="#3b82f6" />

// RGB color
<Spinner color="rgb(59, 130, 246)" />

// Named color
<Spinner color="blue" />

// Using currentColor (inherits from parent)
<div className="text-blue-500">
  <Spinner color="currentColor" />
</div>
```

### Custom Stroke Width

```typescript
<Spinner strokeWidth={2} />  // Thin
<Spinner strokeWidth={6} />  // Thick
```

## Images

#### Different Sizes

![alt text](../../assets/images/spinner/spinner-sizes.png)

#### Different Colors

![alt text](../../assets/images/spinner/spinner-colors.png)

#### Custom Stroke Width

![Loading data](../../assets/images/spinner/spinner-custom-stroke.png)

#### Example Usage

```typescript
<Spinner /> // Default
```

![Default spinner](../../assets/images/spinner/spinner-default.png)

```typescript
<div className="bg-gray-200 rounded mx-auto p-5 w-80 h-40 flex justify-center items-center">
  <div className="flex items-center gap-3">
    <Spinner size={20} color="#3b82f6" />
    <span className="text-sm">Loading data...</span>
  </div>
</div>
```

![Processing](../../assets/images/spinner/spinner-loading.png)

```typescript
<div className="bg-gray-200 rounded mx-auto p-5 w-80 h-40 flex justify-center items-center">
  <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
    <Spinner size={16} color="white" />
    <span>Processing</span>
  </button>
</div>
```

![Combined prop](../../assets/images/spinner/image-processing.png)

```typescript
<Spinner size={48} color="#10b981" strokeWidth={5} className="mx-auto" />
```

## ![alt text](../../assets/images/spinner/spinner-combined-prop.png)
