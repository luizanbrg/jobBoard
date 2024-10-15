const advertisementController = require('./advertisement_controller');
const peopleController = require('./people_controller');

exports.getAlldvertisements = advertisementController.getAllAdvertisements;

exports.createAdvertisement = advertisementController.createAdvertisement;

exports.getAdvertisementById = advertisementController.getAdvertisementById;

exports.updateAdvertisement = advertisementController.updateAdvertisement;

exports.deleteAdvertisement = advertisementController.deleteAdvertisement;

exports.getAllPeople = peopleController.getAllPeople;

exports.getCandidateById = peopleController.getCandidateById;

exports.deletePeople = peopleController.deletePeople;

exports.updatePeople = peopleController.updatePeople;
