import { memo } from "react";
import { Row, Col, Divider, Switch } from "antd";

import BikeItem from "../../models/bike-item";

const BikeDetail = (props: BikeItem) => {
  const getLink = (url: string) => {
    return (
      (url && url != "" && (
        <a href={url} target="_blank">
          {url}
        </a>
      )) ?? <></>
    );
  };

  return (
    <>
      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Identity Number</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>{props?.id}</Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Vehicle Type</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>{props?.vehicleType}</Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Android</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>{getLink(props?.android)}</Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>IOS</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>{getLink(props?.ios)}</Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Disabled</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>
          {<Switch disabled={true} checked={props?.isDisabled ?? false} />}
        </Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Reserved</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>
          {<Switch disabled={true} checked={props?.isReserved ?? false} />}
        </Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Location (Latitude)</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>{props?.location.latitude}</Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Location (Longitude)</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>{props?.location.longitude}</Col>
      </Row>

      <Divider orientation="center"></Divider>

      <Row style={{ textAlign: "left" }}>
        <Col span={10}>
          <h3>Total Bookings</h3>
        </Col>
        <Col span={2}>:</Col>
        <Col span={12}>{props?.totalBookings}</Col>
      </Row>
    </>
  );
};

export default memo(BikeDetail);
