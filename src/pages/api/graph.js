export default function handler(req, res) {
  if (req.method === "POST") {
    // Process the POST request
    res.status(200).json({ name: "Graph data" });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
