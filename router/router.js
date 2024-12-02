const { Router } = require('express');
const router = Router();
const cnt_schema = require('../Schema/schema');
const fs = require('fs');


router.get('/addcontant', (req, res) => {
    res.render('./Contant_App/addContant', { title: 'Home page' });
});


router.post('/addcontant', async (req, res) => {
    try {
        console.log(req.body);
        await cnt_schema.create(req.body);
        res.redirect('/', 302);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding content');
    }
});


router.get('/viewcontant', async (req, res) => {
    try {
        const payload = await cnt_schema.find().lean();
        res.render('./Contant_App/viewcontant', { title: 'All Contents', payload });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching contents');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const payload = await cnt_schema.findOne({ _id: req.params.id }).lean();
        res.render('Contant_App/single_contant', { title: 'Single Content', payload });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching single content');
    }
});


router.get('/edit/:id', async (req, res) => { 
    try {
        const editdata = await cnt_schema.findOne({ _id: req.params.id }).lean();
        res.render('Contant_App/edit', { title: 'Edit Content', editdata });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching content for edit');
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
       
        const editdata = await cnt_schema.findOne({ _id: req.params.id });

        if (!editdata) {
            return res.status(404).send('Content not found');
        }

        editdata.fname = req.body.fname;
        editdata.lname = req.body.lname;
        editdata.numr = req.body.numr;
        editdata.loc = req.body.loc;

      
        await editdata.save();

      
        res.redirect('/api/viewcontant', 302);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating content');
    }
});
router.get('/delete/:id',async(req,res)=>{
      await cnt_schema.deleteOne({ _id: req.params.id })
      res.redirect('/api/viewcontant',302, { title: 'Edit Content'});
})

router.get('/pri/privacypolicy', (req, res) => {
    res.render('Contant_App/privacy',{ title: 'privacy policy'});
});

router.get('/term/terms', (req, res) => {
    res.render('Contant_App/terms',{ title: 'terms and condition'});
});



module.exports = router;


     


