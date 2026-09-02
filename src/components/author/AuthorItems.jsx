import React from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { ENDPOINTS } from "../../api/endpoints";
import { useApi } from "../../hooks/useApi";
import Skeleton from "../UI/Skeleton";

const NewItemSkeleton = () => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
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

const AuthorItems = () => {

  const { authorId } = useParams();

  const { data: items, loading, error } = useApi({
    url: ENDPOINTS.author,
    params: { author: authorId }
  })

  

   if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? Array.from({ length: 8 }, (_, index) => (
                <NewItemSkeleton key={index} />
              ))
            : items?.nftCollection?.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={items?.authorImage || AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                  <Link to="/item-details">
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
