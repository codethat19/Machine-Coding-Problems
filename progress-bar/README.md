## Progress Bar

### Why transform is better than width in the continuous part?

No Layout Reflow: When you change width, the browser has to:

-   Recalculate the layout of affected elements
-   Repaint the affected areas
-   Potentially trigger reflows in parent/child elements
    With transform, the browser only needs to:
-   Composite the layer (much faster)
