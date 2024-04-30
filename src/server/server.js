const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Assumes db.json contains initial data
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get('/users', (req, res) => {
    const { email, password } = req.body;
    const users = router.db.get('users');
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
});

server.post('/users', (req, res) => {
    const { email, password, role } = req.body;
    const newUser = {
        id: Date.now().toString(),
        email,
        password,
        role,
    };
    router.db.get('users').push(newUser).write().then(() => {
        router.db.read();
    });
    res.status(201).json(newUser);
});

server.post('/tickets', (req, res) => {
    const { title, description, attachment, status,email,assignedTo } = req.body;
    const newTicket = {
        id: Date.now().toString(),
        title,
        description,
        attachment,
        status,
        email,
        assignedTo
    };
    router.db.get('tickets').push(newTicket).write().then(() => {
        router.db.read();
    });
    res.status(201).json(newTicket);
});

server.get('/tickets', (req, res) => {
    const tickets = router.db.get('tickets').value();
    res.json(tickets);
});

server.put('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, attachment, status, assignedTo } = req.body;
    const ticketIndex = router.db.get('tickets').findIndex({ id }).value();
    if (ticketIndex !== -1) {
        router.db.get('tickets').find({ id }).assign({ title, description, attachment, status, assignedTo }).write().then(() => {
            router.db.read();
        });
        res.status(200).json({ message: 'Ticket updated successfully' });
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});

server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running');
});
