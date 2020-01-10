const express = require('express');

const HttpError = require('../models/http-error');
const router = express.Router();

const DUMMY_PLACES = [{
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
        lat: 40.7484405,
        lng: -73.9878584
    },
    creator: 'u1'
},
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }];


router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    console.log('GET Request in places');

    /* if (!place) {
         return res.status(404).json({'message': 'Could not find a place for the provided ID'});
     }*/
    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    /*  if (!place) {
          const error = new Error('Could not find a place for the provided id.');
          error.code = 404;
          throw error;
      }*/

    res.json({
        place
    });
    /* res.json({
         message: place
     });*/
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(u => {
        return u.creator === userId;
    });

    /*if (!place) {
        return res.status(404).json({'message': 'Could not find a place for the provided user ID'});
    }*/
    if (!place) {
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    }
    /*if (!place) {
        const error = new Error('Could not find a place for the provided user id.');
        error.code = 404;
        return next(error);
    }*/

    res.json({place});
});

module.exports = router;