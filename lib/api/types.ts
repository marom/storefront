// Hand-written mirror of the ecommerce-api OpenAPI schema (`/v3/api-docs`).
// Money fields are plain `number` as serialized by the API; the API's computed
// totals are authoritative — client-side subtotals are indicative only.

export type PaymentMethod =
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "UPI"
  | "NET_BANKING"
  | "WALLET"
  | "CASH_ON_DELIVERY";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface ErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  details?: string[];
}

export interface ProductPictureResponse {
  id: number;
  productId: number;
  /** Relative path to the raw image bytes, e.g. `/api/v1/products/1/pictures/1/content`. */
  url: string;
  altText: string | null;
  /** Lowest value is the primary picture. */
  displayOrder: number;
  contentType: string;
  sizeBytes: number;
  originalFilename: string | null;
  createdAt: string;
}

export interface ProductPictureUpdateRequest {
  altText?: string;
  displayOrder: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  stockQuantity: number;
  active: boolean;
  categoryId: number;
  categoryName: string;
  /** Ordered by displayOrder; first is the primary picture. */
  pictures: ProductPictureResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  sku: string;
  stockQuantity: number;
  active: boolean;
  categoryId: number;
}

export interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  id: number;
  productId: number;
  customerId: number;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewRequest {
  rating: number;
  comment: string;
}

export interface CustomerResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  createdAt: string;
}

export interface CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface PaymentResponse {
  id: number;
  orderId: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  amount: number;
  createdAt: string;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  customerId: number;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: string;
  notes: string | null;
  items: OrderItemResponse[];
  payment: PaymentResponse | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRequest {
  // The customer is taken from the authenticated principal, not this body.
  shippingAddress: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: OrderItemRequest[];
}

// --- auth ---

export type Role = "ROLE_ADMIN" | "ROLE_CUSTOMER";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  role: Role;
  customerId: number | null;
}

export interface CurrentUserResponse {
  userId: number;
  email: string;
  role: Role;
  customerId: number | null;
  firstName: string | null;
  lastName: string | null;
}
