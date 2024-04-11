import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Destructure name and email from req.body
      const { name, email } = req.body;
      // Check if name and email are provided
      if (!name || !email) {
        return res.status(400).json({
          status: "error",
          message: "Numele și emailul sunt obligatorii",
        });
      }

      // Connect to MongoDB
      const client = await clientPromise;
      // Select the database
      const db = client.db("celebrate-in-style2024");

      // Check if user is already registered
      const user = await db.collection("registrations").findOne({ email });
      if (user) {
        return res.status(400).json({
          status: "error",
          message: "Ești deja înregistrat",
        });
      }

      // Insert the registration into the database
      const response = await db
        .collection("registrations")
        .insertOne({ name, email });

      // Return the response
      res.status(200).json({
        status: "success",
        message: "Înregistrare reușită",
        data: response,
      });
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Eroare la înregistrare",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
