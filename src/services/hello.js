exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      `Hi from Lambda! ` +
        `This function will read from ${process.env.SPACES_TABLE} ` +
        `and return the list`
    ),
  };
};
