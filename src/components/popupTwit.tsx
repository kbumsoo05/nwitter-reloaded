import React, { useEffect, useState } from 'react';
import Modal from './modal'; // 모달 컴포넌트 import
import styled from 'styled-components';
import { LikeLogo } from './twit';
import { ITwit } from './timeline';

interface PopupTwitProps extends ITwit {

}

interface StyledParagraphProps {
    imageUrl: string;
}

const ModalBtn = styled.button`
    background-color: #DBF0FF;
    font-size: 15px;
    font-weight: 600;
    border: none;
    cursor: pointer;
`;

const Wrapper = styled.div`
    display: flex;
    height: 90vh;
    padding: 0px;
`;

const ContentDiv = styled.div`
    display: flex;
    height: 90vh;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledImg = styled.img`
    height: 100%;
    max-width: 60vw;
    object-fit: cover;
    border-radius: 3px;
    border: 1px solid #ccc;
    margin-bottom: 10px;

`;

const ComentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    border-left: 1px solid #ccc;
    `;

const StyledParagraph = styled.p<{ $primary?: boolean; }>`
    width: ${props => props.$primary ? "auto" : "30vw"};

`;


const TwitInfoDiv = styled.div``;

const ComentsDiv = styled.div``;

const TwitLikeDiv = styled.div``;

const SendComentDiv = styled.div``;

export default function PopupTwit({ userName, imageUrl, twit, userId, id, createAt }: PopupTwitProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [imgExsit, setImgExsit] = useState(false);

    useEffect(() => {
        if (imageUrl) {
            setImgExsit(true);
        }
    }, []);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div>
            <ModalBtn onClick={openModal}>댓글 보기</ModalBtn>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Wrapper>
                    {imgExsit ?
                        <ContentDiv>
                            <StyledImg src={imageUrl} />
                            <StyledParagraph $primary>{twit}</StyledParagraph>
                        </ContentDiv>
                        :
                        null
                    }

                    <ComentDiv>
                        <TwitInfoDiv>

                        </TwitInfoDiv>
                        <ComentsDiv></ComentsDiv>
                        <TwitLikeDiv>
                            <LikeLogo>
                                <svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                            </LikeLogo>
                        </TwitLikeDiv>
                        <SendComentDiv>
                        </SendComentDiv>
                    </ComentDiv>
                </Wrapper>
            </Modal>
        </div>
    );
}
