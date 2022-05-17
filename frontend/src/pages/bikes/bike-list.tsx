import { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
  List,
  Card,
  Row,
  Col,
  Select,
  Input,
  Pagination,
  Modal,
  Button,
} from "antd";
import { debounce } from "lodash";
import BikeListItem from "./bike-list-item";
import BikeDetail from "./bike-detail";

import { GET_BIKES } from "./bike-list.query";
import BikeItem from "../../models/bike-item";

const BikeListPage = () => {
  const [bikeList, setBikeList] = useState<BikeItem[]>([]);
  const [counter, setCounter] = useState(60);
  const [totalBooking, setTotalBooking] = useState(0);
  const [page, setPage] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBike, setSelectedBike] = useState<BikeItem | null>();
  const [startCounter, setStartCounter] = useState(false);
  const [timer, setTimer] = useState<any>();

  const { loading, data, refetch } = useQuery(GET_BIKES, {
    variables: { page: 1, vehicleType: "", bikeId: "" },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (counter === 0) {
      refetch({ page: page, vehicleType: vehicleType, bikeId: searchKeyword });
      setStartCounter(false);
    }
  }, [counter]);

  useEffect(() => {
    if (startCounter) {
      const counterTimer = setInterval(
        () => setCounter((c) => (c > 0 ? c - 1 : c)),
        1000
      );
      setTimer(counterTimer);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [startCounter]);

  useEffect(() => {
    if (data) {
      setBikeList(data?.bikes?.data || []);
      setTotalBooking(data.bikes?.totalCount || 0);
      setCounter(data.bikes?.ttl || 30);
      setStartCounter(true);
    }
  }, [data]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    refetch({ page: page });
  };

  const handleChangeVehicleType = (value: any) => {
    setPage(1);
    setVehicleType(value ?? "");
    refetch({ vehicleType: value ?? "", page: 1 });
  };

  const handleSearchKeyword = (e: any) => {
    setSearchKeyword(e.target.value);
    refetchBikeIdDebounced.current(e.target.value);
  };

  const handleBikeDetail = (item: BikeItem) => {
    setSelectedBike(item);
  };

  const refetchBikeIdDebounced = useRef(
    debounce((value: string) => {
      return refetch({
        bikeId: value,
      }) as any;
    }, 300)
  );

  const getListFilter = () => {
    return (
      <Card>
        <div style={{ float: "left" }}>
          <Row>
            <Col span={12}>
              <Input
                type="text"
                placeholder="search by id"
                value={searchKeyword}
                onChange={handleSearchKeyword}
              />
            </Col>
            <Col span={12}>
              <Select
                showSearch
                placeholder="All"
                onChange={handleChangeVehicleType}
              >
                <Select.Option key={"all"} value={""}>
                  All
                </Select.Option>
                <Select.Option key={"scooter"} value={"scooter"}>
                  Scooter
                </Select.Option>
                <Select.Option key={"bike"} value={"bike"}>
                  Bike
                </Select.Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div style={{ float: "right" }}>
          <p>Will refresh in: {counter} seconds</p>
          <p>Total Bookings of Listed Bikes: {totalBooking}</p>
        </div>
      </Card>
    );
  };

  const getListHeader = () => {
    return (
      <>
        {/* <Row style={{ textAlign: "left" }}>
          <Col span={10}>
            <h3>ID</h3>
          </Col>
          <Col span={10}>
            <h3>VEHICLE TYPE</h3>
          </Col>
          <Col span={4}></Col>
        </Row>
        <Divider orientation="left"></Divider> */}
      </>
    );
  };

  const getListFooter = () => {
    return (
      bikeList &&
      bikeList.length > 1 && (
        <Pagination
          current={page}
          total={totalBooking}
          pageSize={10}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      )
    );
  };

  const handleModalClose = () => {
    setSelectedBike(null);
  };

  const getModal = () => {
    return (
      <Modal
        title="BIKE DETAIL"
        visible={selectedBike ? true : false}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        <BikeDetail {...selectedBike!} />
      </Modal>
    );
  };

  return (
    <>
      <h1>BIKE LIST</h1>
      {getListFilter()}
      <List
        bordered
        grid={{ gutter: 16 }}
        itemLayout="vertical"
        size="large"
        loading={loading}
        header={getListHeader()}
        footer={getListFooter()}
      >
        {bikeList.map((item: BikeItem, key: any) => {
          return (
            <BikeListItem
              key={key}
              item={item}
              onClick={() => handleBikeDetail(item)}
            />
          );
        })}
      </List>
      {getModal()}
    </>
  );
};

export default BikeListPage;
