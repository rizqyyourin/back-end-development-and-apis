function stripHtmlTags(str) {
  return String(str).replace(/<[^>]*>/g, "");
}

export function inputCleaner(req, res, next) {
  if (req.body && typeof req.body.username === "string") {
    req.body.username = req.body.username.toLowerCase();
  }

  if (req.body && typeof req.body.comment === "string") {
    req.body.comment = stripHtmlTags(req.body.comment);
  }

  next();
}

export function inputValidator(req, res, next) {
  const username = req.body && req.body.username;

  if (typeof username === "string" && username.length >= 3) {
    return next();
  }

  return res.redirect(
    `/form?error=${encodeURIComponent("Username must be at least 3 characters.")}`,
  );
}