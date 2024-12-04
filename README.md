# Hi HealthTech-1!

## Getting Started

Run `yarn setup` and then either `yarn start:dev` or `yarn start:prod`.

The first runs docker-compose in watch mode, and runs the dev server of the node project.
The second runs docker-compose, but builds the project and then runs node on the static generation.

Both spin up a Redis instance to connect with via Bull. Enjoy!

## Testing

I didn't manage to get to writing Jest tests and I've been running my tests with two commands as follows:

- `curl -X POST -H "Content-Type: application/json" -d '{"eventName": "socksPurchased", "userEmail": "philipgeorge1337@yahoo.co.uk"}' http://localhost:3000/event`

and

- `curl -X POST -H "Content-Type: application/json" -d '{"eventName": "websiteSignUp", "userEmail": "philipgeorge1337@yahoo.co.uk"}' http://localhost:3000/event`

I have used Bull here but if I am a little worried I misunderstood the task, if I was intended to entirely implement this myself I would have done a similar thing but if for example one where to wait 2 hours after a trigger and then send an email, I would store the same information in Redis that I am now, but set expiring keys for a small buffer after 2 hours and then have a Node connection to redis with `emailQueue.process(...)` swapped out for `redis.on('expired', ...)`. Similar implementation, I'm avoiding polling, but this way I'm also storing a receipt of all completed actions via Bull.

Feel free to try to break this, I've been testing sending lots of requests and then killing the system, but as I've persisted the dump.rdb in the redis subdirectories, they send after the system comes back online.

Enjoy!
