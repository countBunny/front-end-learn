## Bootstrap 官方文档研习
---
### HTML5 doctype
>Bootstrap 要求设置 HTML5 doctype。如果没有这个设置，你会看到一些奇怪的、不完整的样式，但是只要添加了这个设置就不会出现任何错误了。
```html
<!doctype html>
<html lang="en">
  ...
</html>
```
---
### Nav  
**Navigation in navbars will also grow to occupy as much horizontal space as possible** to keep your navbar contents securely aligned\.   

---
### 如何使用collapse
>Be sure to add aria-expanded to the control element. This attribute explicitly conveys the current state of the collapsible element tied to the control to screen readers and similar assistive technologies. If **the collapsible element is closed** by default, **the attribute on the control element should have a value of aria-expanded="false"**. If you’ve set the collapsible element to be open by default using the show class, set aria-expanded="true" on the control instead. The plugin will automatically toggle this attribute on the control based on whether or not the collapsible element has been opened or closed (via JavaScript, or because the user triggered another control element also tied to the same collapsbile element). **If the control element’s HTML element is not a button** \(e.g.\, an \<a> or \<div>)\, the attribute role="button" should be added to the element\.  

aria-expended决定一个折叠元素是否要默认展开，如果控制折叠的元素不是button，那么还需要加上role=“button”来标明这是一个按钮的角色。  

>If your control element is targeting a single collapsible element – i.e. the **data-target** attribute is pointing to an id selector – you should add the **aria-controls** attribute to the control element, containing the id of the collapsible element. Modern screen readers and similar assistive technologies make use of this attribute to provide users with additional shortcuts to navigate directly to the collapsible element itself.  
