"use client";
import React from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';

const panelColors = { 0: '#EBEDF0', 2: '#7BC96F', 4: '#C6E488', 12: '#239A3B', 32: '#196127' }

interface DemoProps {
    data: { date: string, count: number }[];
}

const Demo = ({ data }: DemoProps) => {
    return (
        <HeatMap
            value={data}
            width={600}
            style={{ backgroundColor: "#000", color: "#888", padding: '10px', borderRadius: '8px' }}
            startDate={new Date(new Date().getFullYear(), 0, 1)}
            panelColors={panelColors}
            rectRender={(props: React.SVGProps<SVGRectElement>, data: any) => {
                return (
                    <Tooltip placement="top" content={`count: ${data.count || 0}`}>
                        <rect {...props} />
                    </Tooltip>
                );
            }}
        />
    )
};
export default Demo;