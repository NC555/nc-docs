## [Computer Architecture](./computer-architecture.md)

- Disk Storage
- RAM
- Cache
- CPU

## [Infrustructure Design](./infrustructure-design.md)

- CAP Theorem
- Throughput
- Latency
- SLOs and SLAs

## [Networking](./networking.md)

- TCP
- UDP
- DNS
- IP Addresses & IP Headers

## [Application Layer Protocols](./app-layer-protocols.md)

## [Proxy Servers](./proxy-servers.md)

## [Load Balancers](./load-balancers.md)

## [Databases](./databases.md)

- Sharding
- Replication
- ACID
- Vertical & Horizontal Scaling

## Transcript

20:02
fulfill the request 400 series are client error codes these are used when
20:08
the request contains bad syntax or cannot be fulfilled and 500 series are
20:13
server error codes this indicates that something went wrong on the server we
20:18
also have a method on each request the most common methods are get post put patch and delete get is used for
20:25
fetching data post is usually for creating a data on server puted patch
20:30
are for updating a record and delete is for removing a record from database HTTP
20:36
is oneway connection but for realtime updates we use web sockets that provide a two-way Communication channel over a
20:43
single long lift connection allowing servers to push real-time updates to clients this is very important for
20:50
applications requiring constant data updates without the overhead of repeated HTTP request response Cycles it is
20:58
commonly used for chat applications live sport updates or stock market feeds where the action never stops and neither
21:05
does the conversation from email related protocols SMTP is the standard for email
21:11
transmission over the Internet it is the protocol for sending email messages
21:16
between servers most email clients use SMTP for sending emails and either IMAP
21:22
or pop free for retrieving them imup is used to retrieve emails from a server
21:27
allowing a client to access and manipulate messages this is ideal for users who need to access their emails
21:33
from multiple devices pop free is used for downloading emails from a server to a local client
21:40
typically used when emails are managed from a single device moving on to file
21:45
transfer and management protocols the traditional protocol for transferring files over the Internet is FTP which is
21:53
often used in Website Maintenance and large data transfers it is used for the
21:58
trans of files between a client and server useful for uploading files to server or backing up files and we also
22:05
have SSH or secure shell which is for operating Network Services securely on an unsecured Network it's commonly used
22:13
for logging into a remote machine and executing commands or transferring files
22:19
there are also real-time communication protocols like web RTC which enables browser to browser applications for
22:26
voice calling video chat and file Shar sharing without internal or external plugins this is essential for
22:32
applications like video conferencing and live streaming another one is mqtt which is a
22:39
lightweight messaging protocol ideal for devices with limited processing power and in scenarios requiring low bandwidth
22:46
such as iot devices and amqp is a protocol for message oriented middleware
22:52
providing robustness and security for Enterprise level message communication
22:57
for example it is used in tools like rabbit mq let's also talk about RPC
23:03
which is a protocol that allows a program on one computer to execute code on a server or another computer it's a
23:10
method used to invoke a function as if it were a local call when in reality the
23:15
function is executed on a remote machine so it abstracts the details of the network communication allowing the
23:22
developer to interact with remote functions seamlessly as if they were local to the application and many
23:28
application player protocols use RPC mechanisms to perform their operations for example in web services HTTP
23:36
requests can result in RPC calls being made on backend to process data or perform actions on behalf of the client
23:43
or SMTP servers might use RPC calls internally to process email messages or
23:49
interact with databases of course there are numerous other application layer protocols but
23:55
devance covered here are among the most commonly used Bo and essential for web development in this section let's go
API Design
24:02
through the API design starting from the basics and advancing towards the best practices that Define exceptional apis
24:09
let's consider an API for an e-commerce platform like Shopify which if you're not familiar with is a well-known
24:15
e-commerce platform that allows businesses to set up online stores in API design we are concerned with
24:21
defining the inputs like product details for a new product which is provided by a seller and the output like the
24:29
information returned when someone queries a product of an API so the focus is mainly on defining how the crow
24:35
operations are exposed to the user interface CR stands for create read
24:40
update and delete which are basic operations of any data driven application for example to add a new
24:47
product we need to send a post request to/ API products where the product
24:53
details are sent in the request body to retrieve these products we need to send the get request requ EST to/ API SL
25:00
products for updating we use put or patch requests to/ product/ the ID of
25:06
that product and removing is similar to updating it's again/ product/ ID of the
25:12
product we need to remove and similarly we might also have another get request to/ product/ ID which fetches the single
25:20
product another part is to decide on the communication protocol that will be used like HTTP websockets or other protocols
25:29
and the data transport mechanism which can be Json XML or protocol buffers this
25:35
is usually the case for restful apis but we also have graphql and grpc paradigms
25:41
so apis come in different paradigms each with its own set of protocols and standards the most common one is rest
25:49
which stands for representational State transfer it is stateless which means that each request from a client to a
25:55
server must contain all the information needed to understand and complete the request it uses standard HTTP methods
26:03
get post put and delete and it's easily consumable by different clients browsers
26:09
or mobile apps the downside of restful apis is that they can lead to over fetching or under fetching of data
26:17
because more endpoints may be required to access specific data and usually restful apis use Json for data exchange
26:25
on the other hand graphql apis allow clients to request exactly what they need avoiding over fetching and under
26:31
fetching data they have strongly typed queries but complex queries can impact
26:37
server performance and all the requests are sent as post requests and graphql
26:43
API typically responds with HTTP 200 status code even in case of errors with
26:49
error details in the response body grpc stands for Google remote procedure call
26:55
which is built on http2 which provides advanced featur features like multiplexing and server push it uses
27:02
protocol buffers which is a way of serializing structured data and because of that it's sufficient in terms of
27:08
bandwidth and resources especially suitable for microservices the downside is that it's
27:14
less human readable compared to Json and it requires http2 support to operate in
27:21
an e-commerce setting you might have relationships like user to orders or orders to products and you need to
27:28
design endpoints to reflect these relationships for example to fetch the orders for a specific user you need to
27:34
query to get/ users SL the user id/ orders common queries also include limit
27:41
and offset for pagination or start and end date for filtering products within a
27:46
certain date range this allows users or the client to retrieve specific sets of
27:51
data without overwhelming the system a well-designed get request should be itm
27:57
ponent meaning calling it multiple times doesn't change the result and it should always return the same result and get
28:04
requests should never mutate data they are meant only for retrieval if you need to update or create a data you need to
28:11
do a put or post request when modifying end points it's important to maintain backward compatibility this means that
28:19
we need to ensure that changes don't break existing clients a common practice
28:24
is to introduce new versions like version two products so that the version one API can still serve the old clients
28:32
and version 2 API should serve the current clients this is in case of restful apis in the case of graph Co
28:39
apis adding new Fields like V2 Fields without removing old one helps in evolving the API without breaking
28:46
existing clients another best practice is to set rate limitations this can
28:52
prevent the API from Theos attacks it is used to control the number of requests a
28:57
user can make in certain time frame and it prevents a single user from sending
29:02
too many requests to your single API a common practice is to also set course
29:08
settings which stands for cross origin resource sharing with course settings
29:13
you can control which domains can access to your API preventing unwanted cross-site interactions now imagine a
Caching and CDNs
29:20
company is hosting a website on a server in Google cloud data centers in Finland it may take around 100 milliseconds to
29:27
load for users in Europe but it takes 3 to 5 Seconds to load for users in Mexico
29:33
fortunately there are strategies to minimize this request latency for users who are far away these strategies are
29:39
called caching and content delivery networks which are two important Concepts in modern web development and
29:45
system design caching is a technique used to improve the performance and efficiency of a system it involves
29:52
storing a copy of certain data in a temporary storage so that future requests for that data can be served
29:58
faster there are four common places where cash can be stored the first one is browser caching where we store
30:05
website resources on a user's local computer so when a user revisits a site
30:10
the browser can load the site from the local cache rather than fetching everything from the server again users
30:16
can disable caching by adjusting the browser settings in most browsers developers can disable cach from the
30:23
developer tools for instance in Chrome we have the disable cache option in the dev Vel opers tools Network tab the cach
30:30
is stored in a directory on the client's hard drive managed by the browser and browser caches store HTML CSS and JS
30:38
bundle files on the user's local machine typically in a dedicated cache directory
30:43
managed by the browser we use the cache control header to tell browser how long
30:48
this content should be cached for example here the cache control is set to 7,200 seconds which is equivalent to 2
30:56
hours when the re ested data is found in the cache we call that a cash hit and on
31:01
the other hand we have cash Miss which happens when the requested data is not in the cash necessitating a fetch from
31:07
the original source and cash ratio is the percentage of requests that are served from the cach compared to all
31:14
requests and the higher ratio indicates a more effective cach you can check if the cash fall hit or missed from the
31:20
xcash header for example in this case it says Miss so the cash was missed and in
31:26
case the cash is found we will have here it here we also have server caching which involves storing frequently
31:32
accessed data on the server site reducing the need to perform expensive operations like database queries serers
31:39
side caches are stored on a server or on a separate cache server either in memory
31:44
like redis or on disk typically the server checks the cache from the data before quering the database if the data
31:51
is in the cach it is returned directly otherwise the server queries the database and if the data is not in the
31:58
cache the server retrieves it from the database returns it to the user and then stores it in the cache for future
32:05
requests this is the case of right around cache where data is written directly to permanent storage byp
32:11
passing the cache it is used when right performance is less critical you also
32:16
have write through cache where data is simultaneously written to cache and the permanent storage it ensures data
32:23
consistency but can be slower than right round cache and we also have right back cach where data is first written to the
32:30
cache and then to permanent storage at a later time this improves right performance but you have a risk of
32:36
losing that data in case of a crush of server but what happens if the cash is
32:41
full and we need to free up some space to use our cash again for that we have eviction policies which are rules that
32:48
determine which items to remove from the cash when it's full common policies are to remove least recently used ones or
32:56
first in first out where we remove the ones that were added first or removing the least frequently used ones database
33:03
caching is another crucial aspect and it refers to the practice of caching database query results to improve the
33:09
performance of database driven applications it is often done either within the database system itself or via
33:16
an external caching layer like redies or M cache when a query is made we first
33:21
check the cache to see if the result of that query has been stored if it is we return the cach state avoiding the need
33:28
to execute the query against the database but if the data is not found in the cache the query is executed against
33:35
the database and the result is stored in the cache for future requests this is
33:40
beneficial for read heavy applications where some queries are executed frequently and we use the same eviction
33:47
policies as we have for server side caching another type of caching is CDN
33:52
which are a network of servers distributed geographically they are generally used to serf static content
33:58
such as JavaScript HTML CSS or image and video files they cat the content from
34:04
the original server and deliver it to users from the nearest CDN server when a
34:09
user requests a file like an image or a website the request is redirected to the nearest CDN server if the CDN server has
34:17
the cached content it delivers it to the user if not it fetches the content from
34:22
the origin server caches it and then forwards it to the user this is the pool based type type of CDN where the CDN
34:29
automatically pulls the content from the origin server when it's first requested by a user it's ideal for websites with a
34:36
lot of static content that is updated regularly it requires less active management because the CDN automatically
34:43
keeps the content up to date another type is push based CDs this is where you
34:48
upload the content to the origin server and then it distributes these files to the CDN this is useful when you have
34:55
large files that are infrequently updated but need to be quickly distributed when updated it requires
35:01
more active management of what content is stored on the edn we again use the cache control header to tell the browser
35:08
for how long it should cach the content from CDN CDN are usually used for
35:13
delivering static assets like images CSS files JavaScript bundles or video
35:18
content and it can be useful if you need to ensure High availability and performance for users it can also reduce
35:25
the load on the origin server but there are some instances where we still need to hit our origin server for example
35:32
when serving Dynamic content that changes frequently or handling tasks that require real-time processing and in
35:39
cases where the application requires complex server side logic that cannot be done in the CDN some of the benefits
35:46
that we get from CDN are reduced latency by serving content from locations closer
35:52
to the user CDN significantly reduce latency it also adds High avail ability
35:58
and scalability CDN can handle high traffic loads and are resilent against
36:03
Hardware failures it also adds improved security because many CDN offer security
36:09
features like DDS protection and traffic encryption and the benefits of caching are also reduced latency because we have
36:16
fast data retrieval since the data is fetched from the nearby cache rather than a remote server it lowers the
36:23
server load by reducing the number of requests to the primary data source decreasing server load and overall
36:30
faster load times lead to a better user experience now let's talk about proxy servers which act as an intermediary
Proxy Servers (Forward/Reverse Proxies)
36:37
between a client requesting a resource and the server providing that resource it can serve various purposes like
36:44
caching resources for faster access anonymizing requests and load balancing
36:49
among multiple servers essentially it receives requests from clients forwards them to the relevant servers and then
36:56
Returns the servers respond back to the client there are several types of proxy servers each serving different purposes
37:03
here are some of the main types the first one is forward proxy which sits in front of clients and is used to send
37:10
requests to other servers on the Internet it's often used within the internal networks to control internet
37:17
access next one is reverse proxy which sits in front of one or more web servers
37:22
intercepting requests from the internet it is used for load balancing web
37:27
acceleration and as a security layer another type is open proxy which allows
37:33
any user to connect and utilize the proxy server often used to anonymize web
37:38
browsing and bypass content restrictions we also have transparent proxy types
37:43
which passes along requests and resources without modifying them but it's visible to the client and it's
37:49
often used for caching and content filtering next type is anonymous proxy which is identifiable as a proxy server
37:57
but but does not make the original IP address available this type is used for anonymous browsing we also have
38:04
distorting proxies which provides an incorrect original Ip to the destination server this is similar to an anonymous
38:11
proxy but with purposeful IP misinformation and next popular type is high anonymity proxy or Elite proxy
38:19
which makes detecting the proxy use very difficult these proxies do not send X
38:24
forwarded for or other identifying header and they ensure maximum anonymity
38:30
the most commonly used proxy servers are forward and reverse proxies a forward proxy acts as a middle layer between the
38:37
client and the server it sits between the client which can be a computer on an
38:42
internal Network and the external servers which can be websites on the internet when the client makes a request
38:49
it is first sent to the forward proxy the proxy then evaluates the request and decides based on its configuration and
38:57
rules whether to allow the request modify it or to block it one of the
39:02
primary functions of a forward proxy is to hide the client's IP address when it
39:07
forwards the request to the Target server it appears as if the request is coming from the proxy server itself
39:14
let's look at some example use cases of forward proxies one popular example is
39:20
Instagram proxies these are a specific type of forward proxy used to manage multiple Instagram accounts without
39:27
triggering bonds or restrictions and marketers and social media managers use
39:32
Instagram proxies to appear as if they are located in different area or as different users which allows them to
39:39
manage multiple accounts automate tasks or gather data without being flaged for
39:44
suspicious activity next example is internet use control and monitoring proxies some organizations use forward
39:52
proxies to Monitor and control employee internet usage they can block access to
39:57
non-related sites and protect against web based threats they can also scan for
40:03
viruses and malware in incoming content next common use case is caching
40:08
frequently accessed content forward proxies can also cach popular websites or content reducing bandwidth usage and
40:15
speeding up access for users within the network this is especially beneficial in
40:21
networks where bandwidth is costly or limited and it can be also used for anonymizing web access people who are
40:28
concerned about privacy can use forward proxies to hide their IP address and other identifying information from
40:35
websites they Vis it and making it difficult to track their web browsing activities on the other hand the reverse
40:42
proxy is a type of proxy server that sits in front of one or more web servers
40:47
intercepting requests from clients before they reach the servers while a forward proxy hides the client's
40:54
identity a reverse proxy essentially hides the servers Identity or the existence of multiple servers behind it
41:01
the client interacts only with the reverse proxy and may not know about the servers behind it it also distributes
41:08
client requests across multiple servers balancing load and ensuring no single server becomes overwhelmed reverse proxy
41:16
can also compress inbound and outbound data cache files and manage SSL
41:21
encryption there be speeding up load time and reducing server load some common use case cases of reverse proxies
41:28
are load balancers these distribute incoming Network traffic across multiple servers ensuring no single server gets
41:36
too much load and by Distributing traffic we prevent any single server from becoming a bottleneck and it's
41:43
maintaining optimal service speed and reliability CDs are also a type of reverse proxies they are a network of
41:50
servers that deliver cach static content from websites to users based on the geographical location of the user they
41:58
act as Reverse proxies by retrieving content from the origin server and caching it so that it's closer to the
42:04
user for faster delivery another example is web application firewalls which are
42:10
positioned in front of web applications they inspect incoming traffic to block hacking attempts and filter out unwanted
42:17
traffic firewalls also protect the application from common web exploits and
42:22
another example is SSL off loading or acceleration some reverse proxies handle
42:28
the encryption and decryption of SSL TLS traffic offloading that task from web
42:33
servers to optimize their performance load balancers are perhaps the most popular use cases of proxy servers they
Load Balancers
42:41
distribute incoming traffic across multiple servers to make sure that no server Bears Too Much load by spreading
42:48
the requests effectively they increase the capacity and reliability of applications here are some common
42:54
strategies and algorithms used in load balancing first one is round robin which is the
42:59
simplest form of load balancing where each server in the pool gets a request in sequential rotating order when the
43:06
last server is reached it Loops back to the first one this type works well for servers with similar specifications and
43:14
when the load is uniformly distributable next one is list connections algorithm which directs
43:20
traffic to the server with the fewest active connections it's ideal for longer
43:25
tasks or when the server load is not evenly distributed next we have the least response time algorithm which
43:32
chooses the server with the lowest response time and fewest active connections this is effective and the
43:38
goal is to provide the fastest response to requests next algorithm is IP hashing
43:44
which determines which server receives the request based on the hash of the client's IP address this ensures a
43:51
client consistently connects to the same server and it's useful for session persistence in application where it's
43:57
important that the client consistently connects to the same server the variance of these methods can also be vited which
44:04
brings us to the weighted algorithms for example in weighted round robin or weighted list connections servers are
44:11
assigned weights typically based on their capacity or performance metrics and the servers which are more capable
44:18
handle the most requests this is effective when the servers in the pool have different capabilities like
44:24
different CPU or different Rams we also have geographical algorithms which
44:30
direct requests to the server geographically closest to the user or based on specific Regional requirements
44:37
this is useful for Global Services where latency reduction is priority and the
44:42
next common algorithm is consistent hashing which uses a hash function to distribute data across various nodes
44:49
imagine a hash space that forms a circle where the end wraps around to the beginning often referred to as a has
44:56
ring and both the nodes and the data like keys or stored values are hushed
45:01
onto this ring this makes sure that the client consistently connects to the same server every time an essential feature
45:09
of load balancers is continuous Health checking of servers to ensure traffic is only directed to servers that are online
45:16
and responsive if a server fails the load balancer will stop sending traffic
45:22
to it until it is back online and load balancers can be in different forms
45:27
including Hardware applications software Solutions and cloud-based Services some
45:33
of the popular Hardware load balancers are F5 big IP which is a widely used
45:38
Hardware load balancer known for its high performance and extensive feature set it offers local traffic management
45:45
Global server load balancing and application security another example is
45:51
Citrix forly known as net scaler which provides load balancing content switching and ation acceleration some
45:58
popular software load balancers are AJ proxy which is a popular open-source software load balancer and proxy server
46:06
for TCP and HTTP based applications and of course Eng X which is often used as a
46:12
web server but it also functions as a load balancer and reverse proxy for HTTP
46:18
and other network protocols and some popular cloud-based load balancers are
46:23
aws's elastic load balancing or microsof oft aure load balancer or Google Cloud's
46:30
load balancer there are even some virtual load balancers like Vim ver Advanced load balancer which offers a
46:37
softwar defined application delivery controller that can be deployed on premises or in the cloud now let's see
46:44
what happens when a load balancer goes down when the load balancer goes down it
46:49
can impact the whole availability and performance of the application or Services it manages it's basically a
46:57
single point of failure and in case it goes down all of the servers become unavailable for the clients to avoid or
47:04
minimize the impact of a load balancer failure we have several strategies which can be employed first one is
47:10
implementing a redundant load balancing by using more than one load balancer often in pairs which is a common
47:18
approach if one of them fails the other one takes over which is a method known as a
47:23
failover next strategy is to continuously monitor and do health checks of load balancer itself this can
47:30
ensure that any issues are detected early and can be addressed before causing significant disruption we can
47:37
also Implement Autos scaling and selfhealing systems some Modern infrastructures are designed to
47:43
automatically detect the failure of load balancer and replace it with the new instance without manual intervention and
47:51
in some configurations the NS failover can reroute traffic away from an IP address that is is no longer accepting
47:58
connections like a failed load balancer to a preconfigured standby IP which is
48:03
our new load balancer system design interviews are incomplete without a deep dive into databases in the next few
Databases (Sharding, Replication, ACID, Vertical & Horizontal Scaling)
48:10
minutes I'll take you through the database Essentials you need to understand to a that interview we'll
48:16
explore the role of databases in system design sharding and replication techniques and the key ACD properties
48:24
we'll also discuss different types of databases vertical and horizontal scaling options and database performance
48:30
techniques we have different types of databases each designed for specific tasks and challenges let's explore them
48:38
first type is relational databases think of a relational database like a well
48:43
organized filling cabinet where all the files are neatly sorted into different drawers and folders some popular
48:50
examples of SQL databases are poster SQL MySQL and SQL light all of the SQL
48:57
databases use tables for data storage and they use SQL as a query language
49:04
they are great for transactions complex queries and integrity relational
49:09
databases are also acid compliant meaning they maintain the ACD properties
49:14
a stands for atomicity which means that transactions Are All or Nothing C stands
49:20
for consistency which means that after a transaction your database should be in a consistent state I is isolation which
49:28
means that transactions should be independent and D is for durability which means that once transaction is
49:34
committed the data is there to stay we also have nosql databases which drop the
49:40
consistency property from the ACD imagine a nosql database as a brainstorming board with sticky notes
49:47
you can add or remove notes in any shape of form it's flexible some popular examples are mongod DB Cassandra and
49:55
redis there are different different types of nosql databases such as key value pairs like redis document based
50:02
databases like mongod DB or graph based databases like Neo 4G nosql databases
50:09
are schema less meaning they don't have foreign Keys between tables which link the data together they are good for
50:16
unstructured data ideal for scalability quick iteration and simple queries there
50:22
are also inmemory databases this is like having a whiteboard for quick calculations and temporary sketches it's
50:30
fast because everything is in memory some examples are redies and M cach they
50:35
have lightning fast data retrieval and are used primarily for caching and session storage now let's see how we can
50:42
scale databases the first option is vertical scaling or scale up in vertical
50:47
scaling you improve the performance of your database by enhancing the capabilities of individual server where
50:54
the data is running this could involve increasing CPU power adding more RAM
50:59
adding faster or more dis storage or upgrading the network but there is a maximum limit to the resources you can
51:05
add to a single machine and because of that it's very limited the next option is horizontal scaling or scale out which
51:13
involves adding more machines to the existing pool of resources rather than upgrading the single unit databases that
51:20
support horizontal scaling distribute data across a cluster of machines this could involve database sharding or data
51:27
replication the first option is database sharding which is Distributing different portions shards of the data set across
51:34
multiple servers this means you split the data into smaller chunks and distribute it across multiple servers
51:41
some of the sharding strategies include range based sharding where you distribute data based on the range of a
51:48
given key directory based sharding which is utilizing a lookup service to direct
51:53
traffic to the correct database we also have geographical charting which is splitting databases based on
52:00
geographical locations and the next horizontal scaling option is data replication this
52:06
is keeping copies of data on multiple servers for high availability we have
52:11
Master Slave replication which is where you have one master database and several read only slave databases or you can
52:19
have master master application which is multiple databases that can both read and write scaling your data database is
52:27
one thing but you also want to access it faster so let's talk about different performance techniques that can help to
52:33
access your data faster the most obvious one is caching caching isn't just for
52:39
web servers database caching can be done through inmemory databases like redies you can use it to cat frequent queries
52:46
and boost your performance the next technique is indexing indexes are another way to boost the performance of
52:52
your database creating an index for frequently accessed column will significantly speed up retrieval times
52:59
and the next technique is query optimization you can also consider optimizing queries for fast data access
53:05
this includes minimizing joints and using tools like SQL query analyzer or explain plan to understand your query's
53:13
performance in all cases you should remember the cap theorem which states that you can only have two of these
53:19
three consistency availability and partition tolerance when designing a
53:24
system you should prioritize two of the is based on the requirements that you have given in the interview if you
53:30
enjoyed this crash course then consider watching my other videos about system Design Concepts and interviews see you
