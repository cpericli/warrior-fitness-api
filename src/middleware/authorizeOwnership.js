export function authorizeOwnership(getResourceById) {
  return async function (req, res, next) {
    try {
      const id = parseInt(req.params.id);

      const resource = await getResourceById(id);

      if (!resource) {
        const error = new Error('Resource not found');
        error.status = 404;
        return next(error);
      }

      if (resource.user_id !== req.user.id) {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}