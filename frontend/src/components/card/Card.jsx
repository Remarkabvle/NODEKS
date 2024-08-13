import React from "react";
import { Card, Col, Row } from "antd";

const CardData = ({ el }) => (
  <Row gutter={32}>
    {[...Array(3)].map((_, idx) => (
      <Col key={idx} span={8} className="bg-indigo-50 shadow-lg rounded-xl">
        <Card
          title={el?.title}
          bordered={false}
          className="p-4 bg-white rounded-lg hover:shadow-2xl"
        >
          <p className="text-gray-700 text-base">{el?.desc}</p>
        </Card>
      </Col>
    ))}
  </Row>
);

export default CardData;
