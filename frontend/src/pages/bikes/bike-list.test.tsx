import * as client from "@apollo/client";
import { QueryResult } from "@apollo/client";

import { fireEvent, render, screen } from "../../utils/test-utils";

import BikeListPage from "./bike-list";
import dummyData from "./dummy-data.json";

describe("<BikeListPage />", () => {
  const loading = false;
  const error: any = null;
  const data = dummyData;
  const refetch = jest.fn();

  beforeEach(() => {
    jest.spyOn(client, "useQuery").mockReturnValue({
      loading,
      error,
      data,
      refetch,
    } as unknown as QueryResult<any, any>);
  });

  it("should render as expected", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<BikeListPage />);

    expect(
      screen.getByText("Total Bookings of Listed Bikes: 500")
    ).toBeInTheDocument();

    dummyData.bikes.data.forEach((bike: any) => {
      if (bike) {
        if (bike.id) expect(screen.getByText(bike.id)).toBeInTheDocument();
        if (bike.vehicleType)
          expect(screen.getAllByText(bike.vehicleType).length).toBeGreaterThan(
            0
          );
      }
    });
  });

  it("should total bookings zero", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    jest.spyOn(client, "useQuery").mockReturnValue({
      loading,
      error,
      data: {
        ...dummyData,
        bikes: [],
      },
      refetch,
    } as unknown as QueryResult<any, any>);

    render(<BikeListPage />);

    expect(
      screen.getByText("Total Bookings of Listed Bikes: 0")
    ).toBeInTheDocument();
  });

  it("should show detail", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<BikeListPage />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    const bike = dummyData.bikes.data[0];

    expect(screen.getByText("BIKE DETAIL")).toBeInTheDocument();
    expect(screen.getAllByText(bike.id).length).toBeGreaterThan(0);
    expect(screen.getByText(bike.location.latitude)).toBeInTheDocument();
    expect(screen.getByText(bike.location.longitude)).toBeInTheDocument();
    expect(screen.getAllByText(bike.vehicleType).length).toBeGreaterThan(0);
  });

  it("should refetch when page changed", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<BikeListPage />);

    const items = screen.getAllByRole("listitem");
    const findItem = items.filter((item) => item.title == "2")[0];
    fireEvent.click(findItem);
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
