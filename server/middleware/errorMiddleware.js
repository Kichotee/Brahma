const errorHandler = (err, req, res, next) => {
    // Log the error for server-side tracking
    console.error(err);

    // Determine status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Structured error response
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        // Optional: Add error type for more detailed client-side handling
        ...(err.name && { errorType: err.name })
    });
};
module.exports={
    errorHandler,
}