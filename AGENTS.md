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

- Keep shared visual roles in `src/styles.css` and shared Mafia primitives; this keeps all existing product pages consistent during brand updates.
- Use one shared LioLogo component backed by an authentic asset pointer for branding; this avoids divergent recreated logos.
- Preserve the centralized demo data and client-side interaction model during visual refactors; the prototype does not need a backend.

- Keep community requests, attendance, founder task progress, profile edits and saves in one root-mounted DemoProvider; this maintains session consistency without adding a backend to the prototype.
- Put distinct community and launch support views on explicit TanStack routes with shared secondary navigation; legacy Launchpad URLs redirect into Build so saved links continue working.
- Keep cross-network search ranking in a browser-safe pure module reading centralized demo data; this makes intelligence results relevant and testable without external services.
- Generated portraits represent fictional demo members only; initialize Jens's photo from his edited uploaded portrait in DemoProvider and render it through the shared Avatar, including an optional draft preview, so profile imagery stays consistent without inventing his identity.
