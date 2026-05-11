import { vi } from "vitest";

const mockAuthService = {
  login: vi.fn(),
  register: vi.fn(),
  getMe: vi.fn(),
};

export default mockAuthService;
