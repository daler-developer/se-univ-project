import { pgTable, serial, varchar, integer, primaryKey, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
  profilePicture: varchar("profilePicture", { length: 256 }),
  description: varchar("description", { length: 256 }),
  location: varchar("location", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
});

const deliveryServices = pgTable("delivery_services", {
  id: serial("id").primaryKey(),
  name: varchar("email", { length: 256 }),
  logoUrl: varchar("logoUrl", { length: 256 }),
  password: varchar("password", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
});

const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  image: varchar("image", { length: 256 }),
  price: integer("price"),
  createdAt: varchar("created_at", { length: 256 }),
  companyId: integer("company_id"),
  deleted: boolean("deleted").default(false),
  purchasesCount: integer("purchases_count").default(0),
});

const productReviews = pgTable("product_reviews", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 256 }),
  stars: integer("stars"),
  productId: integer("product_id"),
  companyId: integer("company_id"),
});

const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 256 }),
  isPinned: boolean("isPinned").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  senderId: integer("sender_id"),
  receiverId: integer("receiver_id"),
});

const companyProductPurchases = pgTable(
  "company_product_purchases",
  {
    id: serial("id"),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
    companyId: integer("company_id")
      .notNull()
      .references(() => companies.id),
    status: varchar("status", { length: 256 }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    deliveryServiceId: integer("delivery_service_id"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.id] }),
  }),
);

const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(companies, {
    fields: [messages.senderId],
    references: [companies.id],
  }),
  receiver: one(companies, {
    fields: [messages.receiverId],
    references: [companies.id],
  }),
}));

const companiesRelations = relations(companies, ({ many, one }) => ({
  products: many(products),
  productReviews: many(productReviews),
  messages: many(messsages),
}));

const productsRelations = relations(products, ({ many, one }) => ({
  reviews: many(productReviews),
  company: one(companies, {
    fields: [products.companyId],
    references: [companies.id],
  }),
  companyReviewer: one(companies, {
    fields: [products.companyId],
    references: [companies.id],
  }),
}));

const productReviewsRelation = relations(productReviews, ({ one }) => ({
  product: one(products, {
    fields: [productReviews.productId],
    references: [products.id],
  }),
}));

const deliveryServicesRelations = relations(deliveryServices, ({ many }) => ({
  orders: many(companyProductPurchases),
}));

const companyProductPurchasesRelations = relations(companyProductPurchases, ({ one }) => ({
  deliveryService: one(deliveryServices, {
    fields: [companyProductPurchases.deliveryServiceId],
    references: [deliveryServices.id],
  }),
}));

export {
  companies,
  deliveryServices,
  products,
  messages,
  productReviews,
  productsRelations,
  productReviewsRelation,
  companyProductPurchases,
  companyProductPurchasesRelations,
  deliveryServicesRelations,
  companiesRelations,
  messagesRelations,
};
