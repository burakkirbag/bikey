import { memo } from "react";
import { Button, List, Row, Col, Divider } from "antd";

import BikeItem from "../../models/bike-item";

export interface BikeListItemProps {
  item: BikeItem;
  onClick: (e: any) => void;
}

const BikeListItem = (props: BikeListItemProps) => {
  return (
    <>
      <List.Item>
        <Row style={{ textAlign: "left" }}>
          <Col span={10}>{props.item?.id}</Col>
          <Col span={10}>{props.item?.vehicleType}</Col>
          <Col span={4}>
            <Button
              type="dashed"
              key="show-detail"
              onClick={(e) => {
                props.onClick(e);
              }}
            >
              Show Detail
            </Button>
          </Col>
        </Row>
      </List.Item>
      <Divider orientation="left"></Divider>
    </>
  );
};

export default memo(BikeListItem);
