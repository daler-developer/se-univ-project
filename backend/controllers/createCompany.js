import db from "../db.js";
import { companies, deliveryServices, products, messages, productReviews, companyProductPurchases } from "../entities.js";
import { eq, or, and, desc, asc } from "drizzle-orm";

const init = (app) => {
  app.post("/api/create-company", async (req, res) => {
    const { email, password, profilePicture, description, location, phone } = req.body;

    // Insert a new company record into the companies table
    const result = await db
      .insert(companies)
      .values({
        email,
        password,
        profilePicture,
        description,
        location,
        phone,
      })
      .returning();

    // If the insertion was successful, return the company ID
    if (result.length > 0) {
      return res.status(201).json({ company: result[0] });
    } else {
      return res.status(500).json({ error: "Failed to create company." });
    }
  });

  app.post("/api/login-company", async (req, res) => {
    try {
      const { name, password } = req.body;

      // Validate that email and password are provided
      if (!name || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      // Check if the company exists by email
      const company = await db.select().from(companies).where(eq(companies.name, name)).limit(1);

      if (company.length === 0) {
        return res.status(404).json({ error: "Company not found." });
      }

      // Check if the provided password matches the stored password
      if (company[0].password !== password) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Return the company ID if the login is successful
      res.status(200).json({ company: company[0] });
    } catch (error) {
      console.error("Error during company login:", error);
      res.status(500).json({ error: "An error occurred while trying to log in." });
    }
  });

  app.get("/api/companies", async (req, res) => {
    try {
      // Query to get all companies
      const result = await db.select().from(companies);

      // Return the list of companies
      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving companies list:", error);
      res.status(500).json({ error: "An error occurred while retrieving the companies list." });
    }
  });

  app.get("/api/my-products", async (req, res) => {
    try {
      const companyId = req.headers["company-id"];
      if (!companyId) {
        return res.status(400).json({ error: "Company ID is required in the headers." });
      }

      const productsList = await db.select().from(products).where(eq(products.companyId, companyId));
      res.status(200).json(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "An error occurred while fetching products." });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const productId = req.params.id;

      const result = await db.update(products).set({ deleted: true }).where(eq(products.id, productId));

      if (result) {
        res.status(200).json({ message: "Product deleted successfully." });
      } else {
        res.status(404).json({ error: "Product not found." });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "An error occurred while deleting the product." });
    }
  });

  app.post("/api/create-delivery", async (req, res) => {
    try {
      const { name, logoUrl, password, phone } = req.body;

      // Insert a new delivery service record into the delivery_services table
      const result = await db
        .insert(deliveryServices)
        .values({
          name,
          logoUrl,
          password,
          phone,
        })
        .returning();

      // If the insertion was successful, return the delivery service ID
      if (result.length > 0) {
        res.status(201).json({ deliveryService: result[0] });
      } else {
        res.status(500).json({ error: "Failed to create delivery service." });
      }
    } catch (error) {
      console.error("Error creating delivery service:", error);
      res.status(500).json({ error: "An error occurred while creating the delivery service." });
    }
  });

  app.post("/api/login-delivery", async (req, res) => {
    try {
      const { name, password } = req.body;

      // Validate that name and password are provided
      if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required." });
      }

      // Check if the delivery service exists by name
      const deliveryService = await db.select().from(deliveryServices).where(eq(deliveryServices.name, name)).limit(1);

      if (deliveryService.length === 0) {
        return res.status(404).json({ error: "Delivery service not found." });
      }

      // Check if the provided password matches the stored password
      if (deliveryService[0].password !== password) {
        return res.status(401).json({ error: "Invalid name or password." });
      }

      // Return the delivery service ID if the login is successful
      res.status(200).json({ deliveryService: deliveryService[0] });
    } catch (error) {
      console.error("Error during delivery service login:", error);
      res.status(500).json({ error: "An error occurred while trying to log in." });
    }
  });

  app.post("/api/products/new", async (req, res) => {
    try {
      // Extract companyId from request headers
      const companyId = req.headers["company-id"];

      if (!companyId) {
        return res.status(400).json({ error: "Missing company ID in headers." });
      }

      const { name, image, price } = req.body;

      // Validate required fields
      if (!name || !image || !price) {
        return res.status(400).json({ error: "Product name and image and price are required." });
      }

      // Insert a new product record into the products table
      const result = await db
        .insert(products)
        .values({
          name,
          image,
          price,
          createdAt: new Date().toISOString(), // Set the current timestamp as createdAt
          companyId: parseInt(companyId), // Ensure companyId is an integer
        })
        .returning({ id: products.id });

      // If the insertion was successful, return the product ID
      if (result.length > 0) {
        res.status(201).json({ id: result[0].id });
      } else {
        res.status(500).json({ error: "Failed to post product." });
      }
    } catch (error) {
      console.error("Error posting product:", error);
      res.status(500).json({ error: "An error occurred while posting the product." });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const { companyId, name } = req.query;

      // Initialize the base query to select all products
      let query = db.select().from(products);

      // Add filtering conditions if query parameters are provided
      if (companyId) {
        query = query.where(products.companyId.eq(parseInt(companyId)));
      }

      if (name) {
        query = query.where(products.name.ilike(`%${name}%`)); // Case-insensitive search
      }

      // Execute the query
      const result = await query;

      // Return the products found
      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ error: "An error occurred while retrieving products." });
    }
  });

  app.post("/api/products/:productId/reviews", async (req, res) => {
    try {
      const { productId } = req.params;
      const { text, stars } = req.body;
      const companyId = req.headers["company-id"];

      // Validate that productId is provided and is a valid number
      if (!productId || isNaN(productId)) {
        return res.status(400).json({ error: "Invalid or missing product ID." });
      }

      // Validate that companyId is provided
      if (!companyId) {
        return res.status(400).json({ error: "Company ID is required in headers." });
      }

      // Validate that text and stars are provided
      if (!text || !stars || isNaN(stars)) {
        return res.status(400).json({ error: "Text and valid stars rating are required." });
      }

      // Insert the new review into the productReviews table
      const result = await db
        .insert(productReviews)
        .values({
          text,
          stars: parseInt(stars),
          productId: parseInt(productId),
          companyId: parseInt(companyId),
        })
        .returning({ id: productReviews.id });

      // Return the newly created review ID
      res.status(201).json({ reviewId: result[0].id });
    } catch (error) {
      console.error("Error creating product review:", error);
      res.status(500).json({ error: "An error occurred while creating the product review." });
    }
  });

  app.get("/api/products/:productId/reviews", async (req, res) => {
    try {
      const { productId } = req.params;

      // Validate that productId is provided and is a valid number
      if (!productId || isNaN(productId)) {
        return res.status(400).json({ error: "Invalid or missing product ID." });
      }

      // Query to select reviews by productId and join with companies
      const result = await db
        .select({
          id: productReviews.id,
          text: productReviews.text,
          stars: productReviews.stars,
          company: {
            id: companies.id,
            name: companies.name,
            profilePicture: companies.profilePicture,
          },
        })
        .from(productReviews)
        .leftJoin(companies, eq(companies.id, productReviews.companyId))
        .where(eq(productReviews.productId, parseInt(productId)));

      // Return the reviews for the specified product (or an empty array if none found)
      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving product reviews:", error);
      res.status(500).json({ error: "An error occurred while retrieving product reviews." });
    }
  });

  app.post("/api/purchase-product", async (req, res) => {
    try {
      const { productId, companyId, deliveryServiceId } = req.body;

      // Validate that productId and companyId are provided
      if (!productId || !companyId) {
        return res.status(400).json({ error: "Product ID and Company ID are required." });
      }

      // Insert a new purchase record into the company_product_purchases table
      const result = await db
        .insert(companyProductPurchases)
        .values({
          productId: parseInt(productId),
          companyId: parseInt(companyId),
          status: "NEW", // Set initial status to "NEW"
          createdAt: new Date().toISOString(), // Set the current timestamp
          deliveryServiceId: deliveryServiceId ? parseInt(deliveryServiceId) : null, // Optional deliveryServiceId
        })
        .returning({ productId: companyProductPurchases.productId, companyId: companyProductPurchases.companyId });

      // If the insertion was successful, return the productId and companyId
      if (result.length > 0) {
        res.status(201).json({ productId: result[0].productId, companyId: result[0].companyId });
      } else {
        res.status(500).json({ error: "Failed to create a purchase record." });
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      res.status(500).json({ error: "An error occurred while purchasing the product." });
    }
  });

  app.get("/api/purchase-history", async (req, res) => {
    try {
      // Extract companyId from request headers
      const companyId = req.headers["company-id"];

      // Validate that companyId is provided
      if (!companyId) {
        return res.status(400).json({ error: "Company ID is required in headers." });
      }

      // Query to select purchase history for the company
      const purchaseHistory = await db
        .select()
        .from(companyProductPurchases)
        .leftJoin(products, companyProductPurchases.productId.eq(products.id))
        .where(companyProductPurchases.companyId.eq(parseInt(companyId)));

      // Return the purchase history
      res.status(200).json(purchaseHistory);
    } catch (error) {
      console.error("Error retrieving purchase history:", error);
      res.status(500).json({ error: "An error occurred while retrieving purchase history." });
    }
  });

  app.get("/api/assigned-purchases", async (req, res) => {
    try {
      // Extract deliveryServiceId from request headers
      const deliveryServiceId = req.headers["delivery-service-id"];

      // Validate that deliveryServiceId is provided
      if (!deliveryServiceId) {
        return res.status(400).json({ error: "Delivery Service ID is required in headers." });
      }

      // Query to select purchases where the deliveryServiceId matches
      const assignedPurchases = await db
        .select()
        .from(companyProductPurchases)
        .leftJoin(products, eq(companyProductPurchases.productId, product.id))
        .where(eq(companyProductPurchases.deliveryServiceId, deliveryServiceId));

      // Return the assigned purchases
      res.status(200).json(assignedPurchases);
    } catch (error) {
      console.error("Error retrieving assigned purchases:", error);
      res.status(500).json({ error: "An error occurred while retrieving assigned purchases." });
    }
  });

  app.post("/api/mark-delivered/:purchaseId", async (req, res) => {
    try {
      // Extract purchaseId from params and deliveryServiceId from headers
      const { purchaseId } = req.params;
      const deliveryServiceId = req.headers["delivery-service-id"];

      // Validate that purchaseId and deliveryServiceId are provided
      if (!purchaseId || !deliveryServiceId) {
        return res.status(400).json({ error: "Purchase ID and Delivery Service ID are required." });
      }

      // Update the purchase status to "DELIVERED"
      const result = await db
        .update(companyProductPurchases)
        .set({
          status: "DELIVERED",
        })
        .where(companyProductPurchases.id.eq(parseInt(purchaseId)));

      // Check if the purchase was successfully updated
      if (result.length === 0) {
        return res.status(404).json({ error: "Purchase not found or unauthorized." });
      }

      // Return success response
      res.status(200).json({ message: "Purchase marked as delivered." });
    } catch (error) {
      console.error("Error updating purchase status:", error);
      res.status(500).json({ error: "An error occurred while updating the purchase status." });
    }
  });

  app.post("/api/send-message", async (req, res) => {
    try {
      // Extract senderId from headers and message details from the request body
      const senderId = req.headers["company-id"];
      const { text, receiverId } = req.body;

      // Validate that senderId, text, and receiverId are provided
      if (!senderId) {
        return res.status(400).json({ error: "Sender ID (company-id) is required in headers." });
      }
      if (!text || !receiverId) {
        return res.status(400).json({ error: "Text and receiver ID are required." });
      }

      // Insert a new message record into the messages table
      const result = await db
        .insert(messages)
        .values({
          text,
          senderId: parseInt(senderId),
          receiverId: parseInt(receiverId),
          isPinned: false, // Default is not pinned
        })
        .returning();

      // If the insertion was successful, return the message ID
      if (result.length > 0) {
        res.status(201).json({ message: result[0] });
      } else {
        res.status(500).json({ error: "Failed to send message." });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "An error occurred while sending the message." });
    }
  });

  app.get("/api/get-messages/:companyId", async (req, res) => {
    try {
      // Extract senderId from params and receiverId from request body
      const senderId = req.params.companyId;
      const receiverId = req.headers["company-id"];

      // Validate that senderId and receiverId are provided
      if (!senderId) {
        return res.status(400).json({ error: "Sender ID (company-id) is required in params." });
      }
      if (!receiverId) {
        return res.status(400).json({ error: "Receiver ID is required in the body." });
      }

      // Query to select messages between the two companies and join with the sender details
      const messageHistory = await db
        .select({
          messageId: messages.id,
          text: messages.text,
          isPinned: messages.isPinned,
          createdAt: messages.createdAt,
          sender: {
            id: companies.id,
            name: companies.name,
            profilePicture: companies.profilePicture,
          },
        })
        .from(messages)
        .leftJoin(companies, eq(messages.senderId, companies.id))
        .where(
          or(
            and(eq(messages.senderId, senderId), eq(messages.receiverId, parseInt(receiverId))),
            and(eq(messages.senderId, parseInt(receiverId)), eq(messages.receiverId, parseInt(senderId))),
          ),
        )
        .orderBy(asc(messages.createdAt));

      // Return the messages between the two companies
      res.status(200).json(messageHistory);
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ error: "An error occurred while retrieving messages." });
    }
  });

  app.post("/api/pin-message/:messageId", async (req, res) => {
    try {
      // Extract messageId from params
      const { messageId } = req.params;

      // Validate that messageId is provided
      if (!messageId) {
        return res.status(400).json({ error: "Message ID is required in parameters." });
      }

      // Update the message to set isPinned to true
      const result = await db
        .update(messages)
        .set({
          isPinned: true,
        })
        .where(eq(messages.id, messageId));

      // Check if the message was successfully updated
      if (result.length === 0) {
        return res.status(404).json({ error: "Message not found." });
      }

      // Return success response
      res.status(200).json({ message: "Message pinned successfully." });
    } catch (error) {
      console.error("Error pinning message:", error);
      res.status(500).json({ error: "An error occurred while pinning the message." });
    }
  });

  app.post("/api/unpin-message/:messageId", async (req, res) => {
    try {
      // Extract messageId from params
      const { messageId } = req.params;

      // Validate that messageId is provided
      if (!messageId) {
        return res.status(400).json({ error: "Message ID is required in parameters." });
      }

      // Update the message to set isPinned to true
      const result = await db
        .update(messages)
        .set({
          isPinned: false,
        })
        .where(eq(messages.id, messageId));

      // Check if the message was successfully updated
      if (result.length === 0) {
        return res.status(404).json({ error: "Message not found." });
      }

      // Return success response
      res.status(200).json({ message: "Message pinned successfully." });
    } catch (error) {
      console.error("Error pinning message:", error);
      res.status(500).json({ error: "An error occurred while pinning the message." });
    }
  });

  app.get("/api/delivery-services", async (req, res) => {
    try {
      const services = await db.select().from(deliveryServices);
      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching delivery services:", error);
      res.status(500).json({ error: "An error occurred while fetching delivery services." });
    }
  });
};

export { init };
