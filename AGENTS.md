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
