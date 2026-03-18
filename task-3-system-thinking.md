# Task 3: Basic System Thinking

## 1. Scaling

If the task API starts receiving thousands of requests per minute, a few problems could come up:

- **In-memory storage doesn't scale horizontally.** The current setup stores tasks in a single array on one server process. If you run multiple instances to handle the load, each instance has its own separate store — so tasks created on one instance won't be visible on another. You'd get inconsistent responses depending on which server handles the request.

- **Single process bottleneck.** Node.js runs on a single thread. Under heavy concurrent traffic, requests start queuing up and response times increase. One slow request can hold up others behind it.

- **No rate limiting.** There's nothing stopping a client from sending thousands of requests back to back. Without throttling, a single misbehaving client could exhaust server resources and affect everyone else.

- **No traffic buffering.** Sudden spikes hit the server directly with no queue in between. If a large burst of requests arrives at once, they all compete for the same resources simultaneously.

---

## 2. Performance Improvements

- **Use a real database with indexing.** Replace in-memory storage with something like PostgreSQL or MongoDB. Add indexes on the fields used for filtering — `assignedTo`, `assignedBy`, `status` — so lookups are fast instead of scanning through all tasks.

- **Add caching.** For `GET /tasks`, common queries can be cached (e.g. using Redis) with a short expiry time. Repeated reads return cached data instead of hitting the database every time.

- **Pagination.** Instead of returning all tasks at once, add `limit` and `offset` query parameters. This keeps response sizes manageable as the dataset grows.

- **Run multiple instances.** Use Node's cluster module or a tool like PM2 to run one worker per CPU core, making better use of available hardware.

---

## 3. Production Monitoring

- **Response time (p95/p99)** — average latency hides slow outliers. Tracking the 95th and 99th percentile gives a more accurate picture of what real users are experiencing.

- **Error rate** — percentage of 4xx and 5xx responses over time. A spike in 500s usually means something broke server-side. A spike in 403s could indicate an auth issue.

- **Requests per minute** — establishes a baseline for normal traffic. Unexpected drops could mean an outage; unexpected spikes could indicate a surge or abuse.

- **CPU and memory usage** — steady memory growth over time is a sign of a leak. CPU spikes point to processing bottlenecks.

- **Process restarts** — frequent restarts mean something is crashing. In the current implementation, each restart also wipes all in-memory data.
