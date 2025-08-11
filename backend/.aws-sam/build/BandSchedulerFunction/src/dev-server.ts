import { app } from "./server";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Local dev server listening on http://localhost:${PORT}`);
});
