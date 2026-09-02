import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";
import { useApi } from "../../hooks/useApi";
import { ENDPOINTS } from "../../api/endpoints";

const ExploreItemSkeleton = () => (
  <div
    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
    style={{ display: "block", backgroundSize: "cover" }}
  >
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      <div className="nft__item_wrap">
        <Skeleton width="100%" height="350px" borderRadius="8px" />
      </div>

      <div className="nft__item_info">
        <Skeleton width="70%" height="18px" borderRadius="4px" />
        <br />
        <Skeleton width="35%" height="16px" borderRadius="4px" />
        <Skeleton width="20%" height="16px" borderRadius="4px" />
      </div>
    </div>
  </div>
);

const ExploreItems = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  const { data: items, loading, error } = useApi({
    url: ENDPOINTS.explore,
    params: { filter },
  });

  if (error) {
    return <p>Error: {error}</p>;
  }

  const visibleItems = items.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? Array.from({ length: 8 }, (_, index) => (
            <ExploreItemSkeleton key={index} />
          ))
        : visibleItems.map((item, index) => (
            <div
              key={item.id || index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                  <div className="de_countdown">
                    <CountdownTimer expiryDate={item.expiryDate} />
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {visibleCount < items.length && (
          <Link
            onClick={handleLoadMore}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
