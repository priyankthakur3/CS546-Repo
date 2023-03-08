// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

router
  .route('/:bandId')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });
