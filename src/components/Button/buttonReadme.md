# Button Component

The Button component is a reusable UI element that allows users to trigger an action or perform a specific functionality. It can be used to create buttons of various styles and sizes, and can be customized to fit different design requirements.

## The Button component accepts the following props:

### children

Words or elements displayed inside the button. Everything between <Button> ... </Button>.

### variant

Controls the visual style and color scheme of the button. This determines the background color, text color, hover effects, and overall appearance.

Available values:

- primary - Your main action button. Deep blue background with white text. Use this for the most important action on a page, like "Save", "Submit", or "Continue". Has a shadow and scales down slightly when clicked.
- success - Green-themed button for positive actions. Perfect for confirmations like "Approve", "Accept", or "Confirm". Similar styling to primary but with an accent green color.
- secondary - Gray-toned button for less prominent actions. Uses text color for background. Good for "Cancel" or alternative actions that shouldn't draw as much attention as the primary button.
- outline - Transparent background with a border. Shows only an outline in the text color with transparent inside. Useful when you want a button that doesn't dominate the interface, like "Learn More" or secondary navigation.
- ghost - Minimal style with no border or background initially. Almost invisible until you hover over it, then shows a subtle background. Great for toolbar buttons or actions that should blend into the interface.
- link - Styled like a hyperlink. Appears as highlighted text without button-like styling. Uses the highlight color and works well for inline actions or navigational elements that should look like links.
- danger - Red-themed button for destructive actions. Use this for actions that delete, remove, or perform irreversible operations like "Delete Account" or "Remove Item". Grabs attention to warn users.
- accentlite - Soft green background with green text. A lighter, more subtle version of the success button. Good for secondary positive actions that don't need as much emphasis.
- primarylite - Light blue background with blue text. Softer version of the primary button. Use when you need multiple primary-style buttons but want to create visual hierarchy.
- dangerlite - Light red background with red text. Gentler version of the danger button. Appropriate for warning actions that aren't as severe as deletion.
- secondarylite - Light gray background with dark text. Subtle version of the secondary button. It is good for less important actions or when there are many buttons close together.

### size

Determines the physical dimensions of the button including padding and text size.
Available values:

- sm - Small button. Compact size with less padding. Text is smaller. Good for tight spaces, toolbar actions, or when you need multiple buttons in a row without taking too much space.
- md - Medium button (default). Balanced size that works for most use cases. Comfortable to click and read without being too large. This is what you get if you don't specify a size.
- lg - Large button. More padding and larger text. Use for important actions on landing pages, prominent call-to-action buttons, or when you want to make something very easy to click on mobile devices.

### rounded

Control the button’s corner curve:
none, sm, md, lg, xl, 2xl, full.

### isLoading

Boolean prop that shows a loading spinner and disables the button

Available values:

- false (default) - Button appears normal and is clickable. Shows your regular content with icons if provided.
- true - Displays a spinner animation instead of the content. The button becomes disabled automatically so users can't click it multiple times. Use this when performing asynchronous operations like API calls, form submissions, or any action that takes time.

### leftIcon

Adds an icon or any React element before the button text.

- What it accepts: Any React component or element - typically an icon component from your icon library. The icon will have automatic spacing (margin) added to separate it from the text.
- When to use: When you want to add visual meaning before the text, like a plus icon before "Add Item", a download icon before "Download", or a save icon before "Save Changes".

### rightIcon

Adds an icon or any React element after the button text.

- What it accepts: Any React component or element. Gets automatic spacing to separate it from the text on the left side.
- When to use: For directional cues like arrows pointing right for "Next" or "Continue", external link icons after "Learn More", or dropdown chevrons after menu buttons.

### disabled

Standard HTML button attribute that disables the button.
Available values:

- false (default) - Button is interactive and clickable.
- true - Button cannot be clicked. It appears faded (60% opacity) and shows a "not-allowed" cursor. Use when an action isn't currently available due to form validation, permissions, or other conditions.

### className

Allows you to add custom CSS classes to extend or override the button's styling.

- What it accepts: Any string of CSS class names. These classes are added alongside the component's built-in classes, letting you customize spacing, positioning, or other styles specific to your use case.

### ref

React ref forwarding support for accessing the underlying button element.

- What it accepts: A React ref object. Useful when you need direct access to the DOM element for focusing, measuring, or integrating with third-party libraries.

### Styling

The Button component provides default styling, but you can also customize its appearance using CSS. You can target the button using the class name `.button` or the component's ref.

```jsx
<Button ref={buttonRef} className="custom-button" label="Custom Button" />
```

### Accessibility

The Button component is accessible by default, with appropriate ARIA attributes and event handling. However, you can customize the accessibility by providing additional props:

- `aria-label` (optional): Specifies the accessible label for the button.
- `aria-disabled` (optional): Specifies whether the button is accessible or not.

### Images

Here are some images of the Button component with different props:

#### Loading button

    <Button variant="primary" size="md" leftIcon={<BookmarkIcon className="h-4 w-4" />} isLoading={true}>
        'Save Changes'
    </Button>

![Loading button](../../assets/images/button/button-loading.png)

#### LeftIcon and danger variant

    <Button variant="danger" size="sm" leftIcon={<TrashIcon className="h-3.5 w-3.5" />}>
        Delete
    </Button>

![LeftIcon and danger variant](../../assets/images/button/button-danger-lefticon.png)

#### RightIcon and outline variant

    <Button variant="outline" rightIcon={<ArrowDownTrayIcon className="h-4 w-4" />}>
        Download PDF
    </Button>

![RightIcon and outline variant](../../assets/images/button/button-outline-righticon.png)

#### Enable accentlite variant

    <Button variant="accentlite" size="lg" disabled={false} type="submit">
        Create Account
    </Button>

![Enable accentlite variant](../../assets/images/button/button-accentlite-enabled.png)<br>

#### Hover accentlite variant

![Hover accentlite variant](../../assets/images/button/button-accentlite-hover.png)

#### Disable accentlite variant

    <Button variant="accentlite" size="lg" disabled={true} type="submit">
        Create Account
    </Button>

![Disable accentlite variant](../../assets/images/button/button-accentlite-disabled.png)

#### Button Group

    <div className="flex gap-2">
        <Button variant="primary" size="sm">
        Save
        </Button>
        <Button variant="dangerlite" size="sm">
        Cancel
        </Button>
    </div>

![Button Group](../../assets/images/button/button-group.png)

#### Button group with ghost variant

    <div className="flex gap-1">
        <Button variant="ghost" size="sm" leftIcon={<ChevronLeftIcon className="h-4 w-4" />}>
        Previous
        </Button>
        <Button variant="primarylite" size="sm">
        1
        </Button>
        <Button variant="ghost" size="sm">
        2
        </Button>
        <Button variant="ghost" size="sm">
        3
        </Button>
        <Button variant="ghost" size="sm" rightIcon={<ChevronRightIcon className="h-4 w-4" />}>
        Next
        </Button>
    </div>

![Button group with ghost variant](../../assets/images/button/button-group-ghost.png)

#### Rest variants

#### primary

![Button Component - primary](../../assets/images/button/button-primary.png)

#### success

![Button Component - success](../../assets/images/button/button-success.png)

#### secondary

![Button Component - secondary](../../assets/images/button/button-secondary.png)

#### outline

![Button Component - outline](../../assets/images/button/button-outline.png)

#### ghost

![Button Component - ghost](../../assets/images/button/button-ghost.png)

#### link

![Button Component - link](../../assets/images/button/button-link.png)

#### danger

![Button Component - danger](../../assets/images/button/button-danger.png)

#### accentlite

![Button Component - accentlite](../../assets/images/button/button-accentlite.png)

#### primarylite

![Button Component - primarylite](../../assets/images/button/button-primarylite.png)

#### dangerlite

![Button Component - dangerlite](../../assets/images/button/button-dangerlite.png)

#### secondarylite

![Button Component - secondarylite](../../assets/images/button/button-secondarylite.png)
