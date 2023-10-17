const expres = require('express');
const router = expres.Router();


const { createMessage ,getMessage} = require('../controllers/createMessage');
const { addUser ,getUser} = require('../controllers/userConfig');
const { addConversation,getConversation } = require('../controllers/conversationConfig');
const { uploadImage, getImage } = require('../controllers/imageConfig');
const { upload } = require('../utils/upload');





router.post('/message/add',createMessage);
router.post('/add',addUser);
router.get('/getAllUsers',getUser);
router.post('/conversation/add',addConversation);
router.post('/conversation/get',getConversation);
router.get('/message/get/:id',getMessage);
// router.post('/file/upload', upload.single('file'), uploadImage);
// router.get('/file/:filename', getImage);

module.exports = router;