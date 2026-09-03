import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { useApi } from "../../hooks/useApi";
import { ENDPOINTS } from "../../api/endpoints";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const TopSellerSkeleton = () => (
  <li>
    <div data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000" className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
    </div>
    <div className="author_list_info">
      <Skeleton width="100px" height="18px" borderRadius="4px" />
      <br />
      <Skeleton width="60px" height="16px" borderRadius="4px" />
    </div>
  </li>
);

const TopSellers = () => {
  const { data: items, loading, error } = useApi({
    url: ENDPOINTS.topSellers,
  });

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-in" data-aos-delay="200" data-aos-duration="1000" className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000" className="author_list">
              {loading
                ? Array.from({ length: 12 }, (_, index) => (
                    <TopSellerSkeleton key={index} />
                  ))
                : items.map((item, index) => (
                <li key={item.id || index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
