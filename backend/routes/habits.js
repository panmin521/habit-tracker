const router = require('express').Router();
const auth = require('../middleware/auth');
const Habit = require('../models/Habit');

router.use(auth);

router.get('/', async (req, res) => {
  const habits = await Habit.find({ user: req.user.id });
  res.json(habits);
});

router.post('/', async (req, res) => {
  const habit = await Habit.create({ ...req.body, user: req.user.id });
  res.json(habit);
});

router.delete('/:id', async (req, res) => {
  await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ ok: true });
});

// 打卡/取消打卡
router.post('/:id/checkin', async (req, res) => {
  const { date } = req.body; // YYYY-MM-DD
  const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
  const idx = habit.checkIns.indexOf(date);
  if (idx === -1) habit.checkIns.push(date);
  else habit.checkIns.splice(idx, 1);
  await habit.save();
  res.json(habit);
});

module.exports = router;
