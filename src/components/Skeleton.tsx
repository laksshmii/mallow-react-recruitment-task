import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div<{ width?: string; height?: string; borderRadius?: string }>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  border-radius: ${props => props.borderRadius || '4px'};
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width, 
  height, 
  borderRadius, 
  count = 1 
}) => {
  if (count === 1) {
    return <SkeletonBase width={width} height={height} borderRadius={borderRadius} />;
  }

  return (
    <SkeletonContainer>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonBase 
          key={index} 
          width={width} 
          height={height} 
          borderRadius={borderRadius} 
        />
      ))}
    </SkeletonContainer>
  );
};

export const TableRowSkeleton: React.FC = () => (
  <tr>
    <td><Skeleton width="38px" height="38px" borderRadius="50%" /></td>
    <td><Skeleton width="150px" /></td>
    <td><Skeleton width="100px" /></td>
    <td><Skeleton width="100px" /></td>
    <td><Skeleton width="120px" /></td>
  </tr>
);

export const CardSkeleton: React.FC = () => (
  <div style={{
    background: '#fff',
    borderRadius: '12px',
    padding: '24px 16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }}>
    <Skeleton width="80px" height="80px" borderRadius="50%" />
    <div style={{ marginTop: '12px' }}>
      <Skeleton width="120px" height="18px" />
    </div>
    <div style={{ marginTop: '6px' }}>
      <Skeleton width="150px" height="14px" />
    </div>
  </div>
);