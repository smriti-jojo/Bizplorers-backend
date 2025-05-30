const Broker=require('../models/broker');

exports.fillBrokerDetails = async (req, res) => {
  try {
    const exists = await Broker.findOne({ where: { userId: req.user.id } });
    if (exists) return res.status(400).json({ error: 'Broker details already filled' });

    const broker = await Broker.create({ ...req.body, userId: req.user.id });
    res.status(201).json(broker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBrokerDetails = async (req, res) => {
  try {
    const Broker = await Broker.findOne({ where: { userId: req.user.id } });
    if (!Broker) return res.status(404).json({ error: 'No Broker details found' });
    res.status(200).json(Broker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBrokerDetails = async (req, res) => {
  try {
    const Broker = await Broker.findOne({ where: { userId: req.user.id } });
    if (!Broker) return res.status(404).json({ error: 'No buyer details found' });

    await Broker.update(req.body);
    res.status(200).json(Broker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
