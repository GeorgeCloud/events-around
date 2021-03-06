module.exports = function (app, models) {
  app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
      res.render('index', {events: events});
    });
  });

  app.get('/events/new', (req, res) => {
      res.render('events_new')
  })

  // Create
  app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
      res.redirect(`/events/${event.id}`);
    }).catch((err) => {
      console.log(err);
    });
  })

  // Event Detail
  app.get('/events/:id', async (req, res) => {
    event_id = req.params.id
    let event = await models.Event.findByPk(event_id)
    let rsvps = await models.Rsvp.findAll({ where: { event_id: event_id } })

    res.render('events_show', {event: event, rsvps: rsvps});
  });

  // UPDATE
  app.put('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.update(req.body).then(event => {
        res.redirect(`/events/${req.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  app.delete('/events/:id', (req, res) => {
    event_id = req.params.id;
    models.Event.findByPk(id=event_id).then(event => {
      event.destroy();
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    });
  });

  app.get('/events/:id/edit', (req, res) => {
    event_id = req.params.id
    models.Event.findByPk(id=event_id).then(event => {
      res.render('events_edit', {event: event})
    })
  });
}
