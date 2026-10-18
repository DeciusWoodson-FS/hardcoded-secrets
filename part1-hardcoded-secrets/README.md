# Part 1 – Hard-coded secrets

> **Insecure on purpose.** This repo shows what *not* to do.

The database username/password and the API key are written directly in
[`app.js`](app.js) as constants. Anyone who can see this repository – or any
fork, clone, or old commit of it – can read them.

## Run

```bash
npm start
```

Then open <http://localhost:3000/?key=demo-api-key-1234567890>.
Without the correct `?key=` the server returns `401 Unauthorized`.

## Why this is bad

- Secrets are visible to everyone with read access to the code.
- They live forever in git history, even if you delete them later.
- Rotating a secret means changing code and redeploying.
- Every environment (dev, test, prod) is forced to use the same secret.
