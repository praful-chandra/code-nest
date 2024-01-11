import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type ProfileStatsProps = {
  wrapperClassName?: string;
  stats: {
    totalQuestions: number;
    totalAnswers: number;
    badges: {
      gold: number;
      silver: number;
      bronze: number;
    };
  };
};

const StatsContent = ({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className?: string;
}) => {
  return (
    <div className={cn(className)}>
      <p className="text-dark200_light900 paragraph-semibold">{value}</p>
      <p className="text-dark400_light700 body-medium">{title}</p>
    </div>
  );
};

const CardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="light-border background-light900_dark300 flex w-full flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 md:w-fit dark:shadow-dark-200">
      {children}
    </Card>
  );
};

const BadgeCard = ({
  badgeImage,
  badgeImageAlt,
  badgeName,
  value,
}: {
  badgeImage: string;
  badgeImageAlt: string;
  badgeName: string;
  value: number;
}) => {
  return (
    <CardWrapper>
      <Image src={badgeImage} width={37} height={50} alt={badgeImageAlt} />
      <StatsContent title={badgeName} value={value} />
    </CardWrapper>
  );
};

const ProfileStats = ({ wrapperClassName, stats }: ProfileStatsProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      <h3 className="h3-semibold text-dark200_light900 text-center md:text-left">
        Stats
      </h3>
      <div className="flex-center md:flex-start mt-5 flex-wrap gap-5">
        <CardWrapper>
          <StatsContent
            title="Questions"
            value={stats?.totalQuestions}
            className="mr-10"
          />
          <StatsContent title="Answers" value={stats?.totalAnswers} />
        </CardWrapper>

        {stats?.badges?.gold > 0 && (
          <BadgeCard
            badgeImage="/assets/icons/goldMedal.svg"
            badgeImageAlt="Gold Medal"
            badgeName="Gold Badges"
            value={stats?.badges?.gold}
          />
        )}
        {stats?.badges?.silver > 0 && (
          <BadgeCard
            badgeImage="/assets/icons/silverMedal.svg"
            badgeImageAlt="Silver Medal"
            badgeName="Silver Badges"
            value={stats?.badges?.silver}
          />
        )}
        {stats?.badges?.bronze > 0 && (
          <BadgeCard
            badgeImage="/assets/icons/bronzeMedal.svg"
            badgeImageAlt="Bronze Medal"
            badgeName="Bronze Badges"
            value={stats?.badges?.bronze}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileStats;
