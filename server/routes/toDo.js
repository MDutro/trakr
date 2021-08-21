import { Router } from "express";

export const router = new Router();

export default router;

// get ALL todos
router.get(
    '/',
    (req, res) => {
        // inspect the todo body here
        // respond to request
        // this gets a post so we can use this to make a new todo
        res.send(
            Object.fromEntries(
                Array.from(
                    req.app.locals.services.ToDoStorage
                )
            )
        );
    }
)

// get ALL todos
router.get(
    '/:id',
    (req, res) => {
        res.send(
            req.app.locals.services.ToDoStorage.get(req.params.id)
        );
    }
)

// post new ToDo
router.post(
    '/:id',
    (req, res) => {
        const { todos } = req.body;
        req.app.locals.services.ToDoStorage.set(req.params.id, todos);
        res.sendStatus(200);
    }
)