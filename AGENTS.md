<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Every route declares `staticData.sitemap`; the sitemap includes public content and excludes account, checkout, cart, auth, and admin pages so crawlers only discover indexable pages.
- Account password changes reauthenticate with the current password before updating it, preventing unauthorized changes from an unattended session.
- Product introduction routes share ProductDetailTabs; customer feedback uses authenticated server functions and RLS with safe public projections to keep personal account data private.
- Mount PageScrollReveal once in the root layout to progressively brighten current and future content, excluding forms, navigation and explicitly managed animations so controls remain usable.
- Product-specific editorial details live in focused components passed to ProductDetailTabs; uploaded compositions are cropped into original photo assets and their copy is rendered as editable text to avoid outdated printed specifications.
- Classic editorial content uses the shared product-introduction route without modifying store records or galleries, keeping storytelling separate from commerce data.
- Clear Kakitannin editorial content uses a focused component in the shared product-introduction route; supplied media stays in asset pointers and store records/galleries remain unchanged to separate editorial presentation from commerce.
- Pure Collagen editorial uses a focused component in the shared product-introduction route, with text-free crops of supplied compositions and editable Korean/English copy to keep translated presentation separate from store records and galleries.
- Product introductions append IshinoSoapReasons as a shared text table separate from product-specific editorial layouts; product-specific claims are opt-in so shared presentation does not imply identical formulations.
- Store detail galleries show the product's image_url first and retain existing gallery photos afterward, so representative-photo updates do not replace additional photographs.
