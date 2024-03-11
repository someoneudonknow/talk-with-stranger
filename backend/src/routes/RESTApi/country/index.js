"use strict"

const express = require('express');
const router = express.router();
const asyncHandler = require('../../../helpers/asyncHandler');
const CountryController = require('../../../controller/country.controller');
const { route } = require('../access');

router.get('/country/:id', asyncHandler(CountryController.getCountry));
router.get('/country', asyncHandler(CountryController.getAllCountries));
router.post('country/addnewcountry', asyncHandler(CountryController.addNewCountry));
router.delete('/country/:countryID', asyncHandler(CountryController.delCountry));

module.exports = router;