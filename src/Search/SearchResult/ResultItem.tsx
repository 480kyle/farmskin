import { useCallback, useState } from "react";
import styled from "styled-components";

interface FlexInterface {
  flex: any;
}
interface DetailInterface {
  isOpen: boolean;
}
interface DisabledPriceInterface {
  isLine: boolean;
}

const ResultItemWrapper = styled.div`
  display: flex;
  padding: 15px 5px 15px 30px;
  border-bottom: 1px solid #D2D6DA;
`;
const FlexWrapper = styled.div`
  margin: 0 24px;
  flex: ${(props: FlexInterface) => props.flex};
`;
const Image = styled.img`
  width: ${(props: DetailInterface) => props.isOpen? '200px' : '48px'};
`;

const ItemTitle = styled.span`
  margin-right: 16px;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #353C49;
`;
const ItemAuthor = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #8D94A0;
`;
const Price = styled.span`
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
`;
const DisabledPrice = styled(Price)`
  font-weight: 300;
  font-size: 18px;
  line-height: 26px;
  text-decoration-line: ${(props: DisabledPriceInterface) => props.isLine ? 'line-through' : 'none'};
  color: #353C49;
`;
const ButtonWrapper = styled.div`
  /* display: inline-flex; */
  display: flex;

  button{
    flex: 1;
    margin: 0 5px;
  }
`;
const Button = styled.button`
  padding: 15px 20px;
  background: #F2F4F6;
  border-radius: 8px;
  cursor: pointer;
`;
const PrimaryButton = styled(Button)`
  color: #fff;
  background: #4880EE;
`;
const PrimaryButtonFull = styled(PrimaryButton)`
  width: 100%;
  margin-top: 30px;
`;
const ButtonIcon = styled.img`
  margin-left: 5px;
`;

const Detail = styled.div`
  display: ${(props: DetailInterface) => props.isOpen? 'block' : 'none'};
`;
const DetailAction = styled(Detail)`
  margin-top: 100px;
  text-align: right;
`;
const DetailTitle = styled.div`
  margin-top: 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 26px;
  color: #353C49;
`;
const Description = styled.p`
  margin-top: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #353C49;
`;
const DetailPriceWrapper = styled.div`
  margin-top: 8px;
`;
const DetailPriceDescription = styled.span`
  margin-right: 10px;
  font-weight: 500;
  font-size: 10px;
  line-height: 22px;
  text-align: right;
  color: #8D94A0;
  vertical-align: middle;
`;

const ResultItem = ({item}: {item: any}) => {
  const getCurrency = useCallback((price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const onBuy = () => {
    console.log(item.link);
    window.open(item.link);
  }

  const onDetailToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <ResultItemWrapper>
      <FlexWrapper flex={1} style={!item.image? {display: 'none'} : {}}>
        <Image isOpen={isOpen} src={item.image} alt={item.title} />
      </FlexWrapper>
      <FlexWrapper flex={4}>
        <ItemTitle dangerouslySetInnerHTML={{__html: item.title}}></ItemTitle>
        <ItemAuthor dangerouslySetInnerHTML={{__html: item.author}}></ItemAuthor>
        <Detail isOpen={isOpen}>
          <DetailTitle>책 소개</DetailTitle>
          <Description dangerouslySetInnerHTML={{__html: item.description}}></Description>
        </Detail>
      </FlexWrapper>
      <FlexWrapper flex={1} style={isOpen? {display: 'none'} : {}}>
        <Price>{item.discount? getCurrency(item.discount) : getCurrency(item.price)}</Price>
      </FlexWrapper>
      <FlexWrapper flex={3}>
        <ButtonWrapper>
          <PrimaryButton style={isOpen? {opacity: 0} : {}} onClick={onBuy}>구매하기</PrimaryButton>
          <Button onClick={onDetailToggle}>상세보기<ButtonIcon src="/detail-icon.png" alt="detail-icon" /></Button>
        </ButtonWrapper>
        <DetailAction isOpen={isOpen}>
          <DetailPriceWrapper><DetailPriceDescription>원가</DetailPriceDescription><DisabledPrice isLine={!!item.discount}>{getCurrency(item.price)}</DisabledPrice></DetailPriceWrapper>
          <DetailPriceWrapper style={item.discount? {}: {opacity: 0}}><DetailPriceDescription>할인가</DetailPriceDescription><Price>{getCurrency(item.discount)}</Price></DetailPriceWrapper>
          <PrimaryButtonFull onClick={onBuy}>구매하기</PrimaryButtonFull>
        </DetailAction>
      </FlexWrapper>
    </ResultItemWrapper>
  );
};

export default ResultItem;