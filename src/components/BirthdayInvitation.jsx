import { useState } from "react";
import { toast } from "react-hot-toast";

const BirthdayInvitation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setStatus("loading");
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const { status, message } = data;
      if (status === "error") {
        toast.error(message);
        setStatus("error");
      } else if (status === "success") {
        toast.success(message);
        setStatus("success");
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Eroare la înregistrare");
      setStatus("error");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">
        🎉 E petrecere mare! 🎉
      </h1>
      <p className="mt-4 text-lg text-center sm:mt-6 sm:text-xl md:mt-8 md:text-2xl">
        Pregătește-te să arunci cu confetti pe{" "}
        <span className="font-medium text-blue-500">20 aprilie</span>! Detaliile
        locației vor fi anunțate în curând. Completează formularul de mai jos
        pentru a primi un email cu toate detaliile secrete. 🎂
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-left sm:text-lg"
            >
              Numele tău de petrecăreț/ă:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Johnny Confetti"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-left sm:text-lg"
            >
              Emailul tău (pentru detaliile secrete):
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="johnny@confetti.com"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
            disabled={status === "loading"}
          >
            Vreau la party!
          </button>
        </div>
      </form>
    </section>
  );
};

export default BirthdayInvitation;
