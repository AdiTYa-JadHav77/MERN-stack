const Item = require('../Modules/menuitems')


exports.getMenuItemsByRestaurent=(req,res)=>{
    const {resId} = req.params;
    Item.find({restaurantId: resId})
    .then(response =>{
        res.status(200).json({msg:"succesfully feched Restaurent menu items",items:response })
    }
    )
    .catch(err => res.status(500).json({error:err}))
}