'use client';

import { ChevronDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { NavItems } from '@/components/NavItems';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/actions/auth.actions';

export function UserDropdown({ user }: { user: User }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-12 items-center gap-3 rounded-lg bg-transparent px-3 py-2 text-gray-400 transition-colors hover:bg-transparent! hover:text-yellow-500 focus:ring-0 focus-visible:ring-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-yellow-500 text-sm font-bold text-yellow-900">
              {initials || user.email[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start md:flex">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-gray-600 bg-gray-800 text-gray-400"
        align="end"
      >
        <DropdownMenuLabel className="text-gray-400">
          <div className="relative flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-yellow-500 text-base font-bold text-yellow-900">
                {initials || user.email[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-md font-medium text-gray-100 transition-colors focus:bg-transparent focus:text-yellow-500"
        >
          <LogOut className="mr-2 hidden h-4 w-4 sm:block" />
          Log out
        </DropdownMenuItem>
        <DropdownMenuSeparator className="hidden bg-gray-600 sm:block" />
        <nav className="sm:hidden">
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
