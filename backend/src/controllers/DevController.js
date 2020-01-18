const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {
    index: async (req, res) => {
        const devs = await Dev.find();

        return res.json(devs);
    },
    store: async (req, res) => {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });
        if(!dev){
            try{
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
                const { name = login, avatar_url, bio } = apiResponse.data;
            
                const techsArray = parseStringAsArray(techs);
            
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                }
            
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location,
                });
    
                // Filter connections and notify
                const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);
    
                sendMessage(sendSocketMessageTo, 'new-dev', dev)
            }
            catch(error){
                console.error(error);
                return res.json({ techs: [] });
            }
        }
    
    
        return res.json(dev);
    },
}