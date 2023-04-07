module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Welcome in my javascript example api with Serverless Framework",
        input: event,
      },
      null,
      2
    ),
  };
};
