import { BannerType } from "@/types";
import React from "react";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { Title } from "@mantine/core";

type BannerProps = {
  banners: BannerType[];
};

const MainBanner = ({ banners }: BannerProps) => {
  return (
    <section style={{ width: "100%" }}>
      <Title order={2} mb={10}>Banner</Title>
      <Carousel
        withIndicators
        height={200}
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
      >
        {banners.map((banner) => (
          <Carousel.Slide key={banner.id} sx={{ position: "relative" }}>
            <Image
              src={banner.images}
              width={500}
              height={500}
              alt={`banner-${banner.id}`}
              priority
            />
            <h1
              style={{
                position: "absolute",
                top: "-10px",
                left: "20px",
                color: "white",
                textShadow: "0 1px 0 rgba(0, 0, 0, 0.8)",
              }}
            >
              {banner.id}
            </h1>
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
};

export default MainBanner;
